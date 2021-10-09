import puppeteer, { Page } from "puppeteer";
import { isDev, Queue } from "@src/common";
import { Script } from "./Script";

const WINDOW_SIZE = {
  WIDTH: 1920,
  HEIGHT: 1080,
};

class Crawler {
  cralwer: Page | null = null;
  queue: Queue<Script>;

  constructor() {
    this.init();
    this.queue = new Queue<Script>();
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
}

export default Crawler;
