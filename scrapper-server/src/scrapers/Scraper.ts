import puppeteer, { Page } from "puppeteer";
import { isDev, Queue } from "@src/common";
import { Scenario, SCENARIO_STATE } from "./Scenario";
import { stringify } from "javascript-stringify";
import find from "find";

const WINDOW_SIZE = {
  WIDTH: 1920,
  HEIGHT: 1080,
};

export const SCRAPER_STATE = {
  WAIT: "WAIT",
  RUNNING: "RUNNING",
  STOPPED: "STOPPED",
  ERROR: "ERROR",
} as const;

type SCRAPER_STATE = typeof SCRAPER_STATE[keyof typeof SCRAPER_STATE];

const SCENARIO_DELAY = 1000;

abstract class Scraper<T> {
  state: SCRAPER_STATE = SCRAPER_STATE.STOPPED;
  scraper: Page | null = null;
  queue: Queue<Scenario<T>>;
  loadedScript: boolean = false;
  browser?: puppeteer.Browser;

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

  async init() {
    this.state = SCRAPER_STATE.WAIT;

    this.browser = await puppeteer.launch({
      headless: false,
      args: [`--window-size=${WINDOW_SIZE.WIDTH},${WINDOW_SIZE.HEIGHT}`],
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
          ["image", "stylesheet", "font"].indexOf(request.resourceType()) !== -1
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
    this.state = SCRAPER_STATE.RUNNING;

    if (this.loadedScript && this.queue.isEmpty()) {
      this.state = SCRAPER_STATE.STOPPED;
      this.scraper = null;
      this.browser?.close();
      return;
    }

    const scenario = this.queue.front();

    if (this.scraper && this.loadedScript && scenario) {
      scenario.state = SCENARIO_STATE.RUNNING;
      try {
        this.queue.pop();
        await this.scrapping(scenario);
        scenario.state = SCENARIO_STATE.STOPPED;
      } catch (error) {
        scenario.state = SCENARIO_STATE.ERROR;
        console.log(error);
      }
    }

    setTimeout(() => {
      this.run();
    }, SCENARIO_DELAY);
  }

  // Override
  abstract scrapping(script: Scenario<T>): void;
}

export default Scraper;
