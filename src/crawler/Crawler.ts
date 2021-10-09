import puppeteer, { Page } from "puppeteer";
import { isDev, Queue } from "@src/common";
import { Scenario, SCENARIO_STATE } from "./Scenario";

const WINDOW_SIZE = {
  WIDTH: 1920,
  HEIGHT: 1080,
};

abstract class Crawler<T> {
  cralwer: Page | null = null;
  queue: Queue<Scenario<T>>;

  constructor() {
    this.init();
    this.queue = new Queue<Scenario<T>>();
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

  async run() {
    if (this.cralwer) {
      const scenario = this.queue.pop();
      if (scenario === null) {
        // 시나리오 큐가 비었음
        setTimeout(() => {
          this.run();
        }, 1000);
        return;
      }
      scenario.state = SCENARIO_STATE.RUNNING;

      try {
        await this.crawling(scenario);
        scenario.state = SCENARIO_STATE.STOPPED;
      } catch (error) {
        scenario.state = SCENARIO_STATE.ERROR;
        // 에러처리
      }
    }

    setTimeout(() => {
      this.run();
    }, 1000);
  }

  // Override
  abstract crawling(script: Scenario<T>): void;
}

export default Crawler;
