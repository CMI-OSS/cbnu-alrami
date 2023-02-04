import puppeteer from "puppeteer";

import { IS_DEV } from "./common/isDev";

const WINDOW_SIZE = {
  WIDTH: 1920,
  HEIGHT: 1080,
};

const getScraper = async () => {
  const browser = await puppeteer.launch({
    headless: !IS_DEV,
    args: [ `--window-size=${WINDOW_SIZE.WIDTH},${WINDOW_SIZE.HEIGHT}` ],
  });

  const [ page ] = await browser.pages();

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

  // 필요없는 리소스 무쉬
  if (!IS_DEV) {
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

  return [ browser, page ];
};

export const scrapping = async () => {
  const [ browser, scraper ] = await getScraper();

  browser.close();
};
