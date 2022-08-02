/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import { ScraperLog, ScraperState, ScraperType } from "@shared/types";
import find from "find";
import { stringify } from "javascript-stringify";
import puppeteer, { Page } from "puppeteer";
import { isDev, Queue } from "src/common";
import {
  sendAppendLog,
  sendChangeScenarioQueue,
  sendChangeScraperState,
} from "src/socket/server";

import { Scenario } from "./Scenario";

const WINDOW_SIZE = {
  WIDTH: 1920,
  HEIGHT: 1080,
};

const SCENARIO_DELAY = 1000;

abstract class Scraper<T> {
  abstract name: string;
  abstract type: ScraperType;
  state: ScraperState = ScraperState.Stopped;
  scraper: Page | null = null;
  queue: Queue<Scenario<T>>;
  prevScenario?: Scenario<T> | null;
  currentScenario?: Scenario<T> | null;
  nextScenario?: Scenario<T> | null;
  browser?: puppeteer.Browser;
  scriptPath: string;
  logs: Array<ScraperLog> = [];

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

  log(log: ScraperLog) {
    this.logs.push(log);
    sendAppendLog({ type: this.type, log });
  }

  async init() {
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

  async start() {
    if (this.state === ScraperState.Pause) {
      this.log({
        prefix: "INFO",
        message: `${this.name} 스크래퍼를 재개합니다`,
      });
      this.setScraperState(ScraperState.Running);
      this.run();
      return;
    }

    this.log({
      prefix: "INFO",
      message: `${this.name} 스크래퍼를 시작합니다`,
    });
    await this.init();
    await this.initScript();
    this.setScraperState(ScraperState.Running);
    this.run();
  }

  async stop() {
    this.log({
      prefix: "INFO",
      message: `${this.name} 스크래퍼를 정지합니다`,
    });

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
    this.log({
      prefix: "INFO",
      message: `${this.name} 스크래퍼를 중지합니다`,
    });
    this.setScraperState(ScraperState.Pause);
    if (this.currentScenario) {
      this.queue.pushFront(this.currentScenario);
      this.currentScenario = null;
    }
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

    this.prevScenario = this.currentScenario;
    this.currentScenario = this.queue.front();

    this.log({
      prefix: "INFO",
      message: `${this.currentScenario?.title} 시나리오의 스크립트를 실행합니다`,
    });

    if (this.currentScenario) {
      try {
        this.queue.pop();
        this.nextScenario = this.queue.front();
        sendChangeScenarioQueue({
          type: this.type,
          prevScenario: {
            title: this.prevScenario?.title ?? "",
          },
          currentScenario: {
            title: this.currentScenario?.title ?? "",
          },
          nextScenario: {
            title: this.nextScenario?.title ?? "",
          },
        });
        await this.scrapping(this.currentScenario);
        this.log({
          prefix: "INFO",
          message: `${this.currentScenario?.title} 시나리오의 스크립트가 성공적으로 실행되었습니다`,
        });
      } catch (error) {
        this.log({
          prefix: "ERROR",
          message: `${this.currentScenario?.title} 시나리오의 스크립트 실행도중 에러가 발생했습니다 \n ${error}`,
        });

        // @ts-ignore
        console.log(error);
      }
    }

    setTimeout(() => {
      return this.run();
    }, SCENARIO_DELAY);
  }

  setScraperState(state: ScraperState) {
    this.state = state;
    sendChangeScraperState(this.type, state);
  }

  abstract scrapping(script: Scenario<T>): void;

  abstract initScript(): void;
}

export default Scraper;
