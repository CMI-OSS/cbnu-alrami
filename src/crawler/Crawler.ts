import puppeteer, { Page } from "puppeteer";
import { isDev, Queue } from "@src/common";
import { Scenario, SCENARIO_STATE } from "./Scenario";
import { stringify } from "javascript-stringify";
const find = require("find");

const WINDOW_SIZE = {
  WIDTH: 1920,
  HEIGHT: 1080,
};

const SCENARIO_DELAY = 1000;

abstract class Crawler<T> {
  cralwer: Page | null = null;
  queue: Queue<Scenario<T>>;
  loadedScript: boolean = false;

  constructor(scriptPath: string) {
    this.init();
    this.queue = new Queue<Scenario<T>>();
    this.loadScript(scriptPath);
  }

  loadScript(scriptPath: string) {
    find.file(/\.js$/, scriptPath, (paths: string[]) => {
      for (const path of paths) {
        const script = require(path);
        this.queue.push(new Scenario(script));
      }
      this.loadedScript = true;
    });
  }

  // 크롤러 초기화
  async init() {
    const browser = await puppeteer.launch({
      headless: false,
      args: [`--window-size=${WINDOW_SIZE.WIDTH},${WINDOW_SIZE.HEIGHT}`],
    });

    const pages = await browser.pages();

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
          ["image", "stylesheet", "font"].indexOf(request.resourceType()) !== -1
        ) {
          request.abort();
        } else {
          request.continue();
        }
      });
    }

    this.cralwer = page;
  }

  async evaluateScript(script: T) {
    if (this.cralwer === null) return;

    const stringScript = `
    const script = ${stringify(script)}
  `;

    await this.cralwer.evaluate(stringScript);
  }

  async run() {
    const scenario = this.queue.front();

    if (this.cralwer && this.loadedScript && scenario) {
      scenario.state = SCENARIO_STATE.RUNNING;
      try {
        this.queue.pop();
        await this.crawling(scenario);
        scenario.state = SCENARIO_STATE.STOPPED;
      } catch (error) {
        scenario.state = SCENARIO_STATE.ERROR;
        // 에러처리
      }
    }

    setTimeout(() => {
      this.run();
    }, SCENARIO_DELAY);
  }

  // Override
  abstract crawling(script: Scenario<T>): void;
}

export default Crawler;
