/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import puppeteer, { Page } from "puppeteer";
import { isDev, Queue } from "src/common";
import { stringify } from "javascript-stringify";
import find from "find";
import { ScraperState, ScraperType } from "@shared/types";
import { changeScraperState } from "src/socket/server";
import { Scenario } from "./Scenario";

const WINDOW_SIZE = {
  WIDTH: 1920,
  HEIGHT: 1080,
};

const SCENARIO_DELAY = 1000;

abstract class Scraper<T> {
  abstract type: ScraperType;
  state: ScraperState = ScraperState.Stopped;
  scraper: Page | null = null;
  queue: Queue<Scenario<T>>;
  currentScenario?: Scenario<T> | null;
  browser?: puppeteer.Browser;
  scriptPath: string;

  constructor(scriptPath: string) {
    this.queue = new Queue<Scenario<T>>();
    this.scriptPath = scriptPath;
  }

  loadScripts(): Promise<Array<T>> {
    return new Promise((resolve, _) => {
      const scripts: Array<T> = [];
      find.file(/\.js$/, this.scriptPath, (paths: string[]) => {
        for (const path of paths) {
          const script = require(path);
          scripts.push(script);
        }
        resolve(scripts);
      });
    });
  }

  appendScenario(scenario: Scenario<T>) {
    this.queue.push(scenario);
  }

  async start() {
    if (this.state === ScraperState.Pause) {
      this.setScraperState(ScraperState.Running);
      this.run();
      return;
    }

    await this.initScraper();
    await this.initScript();
    this.setScraperState(ScraperState.Running);
    this.run();
  }

  async stop() {
    this.setScraperState(ScraperState.Stopped);
    this.scraper = null;
    this.browser?.close();
    this.queue.reset();
  }

  async restart() {
    this.stop();
    this.start();
  }

  async pause() {
    this.setScraperState(ScraperState.Pause);
    if (this.currentScenario) {
      this.queue.pushFront(this.currentScenario);
      this.currentScenario = null;
    }
  }

  async initScraper() {
    this.browser = await puppeteer.launch({
      headless: !isDev,
      args: [ `--window-size=${WINDOW_SIZE.WIDTH},${WINDOW_SIZE.HEIGHT}` ],
    });

    const pages = await this.browser.pages();

    const page = pages[0];

    // 페이지 기본설정
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    });

    // 다이어로그 메시지 무시
    page.on("dialog", async (dialog) => {
      await dialog.dismiss();
    });

    if (!isDev) {
      // 필요없는 리소스 무쉬
      await page.setRequestInterception(true);

      page.on("request", (request) => {
        if (
          [ "image", "stylesheet", "font" ].indexOf(request.resourceType()) !== -1
        ) {
          request.abort();
        } else {
          request.continue();
        }
      });
    }

    this.scraper = page;
  }

  async evaluateScript(script: T) {
    if (this.scraper === null) return;

    const stringScript = `
    const script = ${stringify(script)}
  `;

    await this.scraper.evaluate(stringScript);
  }

  async run() {
    if (this.state !== ScraperState.Running) return;

    if (this.queue.isEmpty()) {
      this.stop();
      return;
    }

    this.currentScenario = this.queue.front();

    if (this.currentScenario) {
      try {
        this.queue.pop();
        await this.scrapping(this.currentScenario);
      } catch (error) {
        console.log(error);
      }
    }

    setTimeout(() => this.run(), SCENARIO_DELAY);
  }

  setScraperState(state: ScraperState) {
    this.state = state;
    changeScraperState(this.type, state);
  }

  abstract scrapping(script: Scenario<T>): void;

  abstract initScript(): void;
}

export default Scraper;
