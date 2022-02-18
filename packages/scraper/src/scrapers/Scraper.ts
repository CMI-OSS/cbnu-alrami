/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
import puppeteer, { Page } from "puppeteer";
import { isDev, Queue } from "src/common";
import { stringify } from "javascript-stringify";
import find from "find";
import { Scenario } from "./Scenario";

const WINDOW_SIZE = {
  WIDTH: 1920,
  HEIGHT: 1080,
};

export const SCRAPER_STATE = {
  RUNNING: "RUNNING",
  PAUSE: "PAUSE",
  STOPPED: "STOPPED",
  ERROR: "ERROR",
} as const;

type SCRAPER_STATE = typeof SCRAPER_STATE[keyof typeof SCRAPER_STATE];

const SCENARIO_DELAY = 1000;

abstract class Scraper<T> {
  state: SCRAPER_STATE = SCRAPER_STATE.STOPPED;
  scraper: Page | null = null;
  queue: Queue<Scenario<T>>;
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
    if (this.state === SCRAPER_STATE.PAUSE) {
      this.state = SCRAPER_STATE.RUNNING;
      this.run();
      return;
    }

    await this.initScraper();
    await this.initScript();
    this.state = SCRAPER_STATE.RUNNING;
    this.run();
  }

  async stop() {
    this.state = SCRAPER_STATE.STOPPED;
    this.scraper = null;
    this.browser?.close();
    this.queue.reset();
  }

  async restart() {
    this.stop();
    this.start();
  }

  async pause() {
    this.state = SCRAPER_STATE.PAUSE;
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
    if (this.state !== SCRAPER_STATE.RUNNING) return;

    if (this.queue.isEmpty()) {
      this.stop();
      return;
    }

    const scenario = this.queue.front();

    if (scenario) {
      try {
        this.queue.pop();
        await this.scrapping(scenario);
      } catch (error) {
        console.error(error);
      }
    }

    setTimeout(() => this.run(), SCENARIO_DELAY);
  }

  abstract scrapping(script: Scenario<T>): void;

  abstract initScript(): void;
}

export default Scraper;
