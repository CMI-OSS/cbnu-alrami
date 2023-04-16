/* eslint-disable no-console */

import { stringify } from "javascript-stringify";
import puppeteer from "puppeteer";
import { log } from "src/common/log";

import { IS_DEV } from "../common/isDev";
import configuration from "../config/configuration";

export interface Scenario {
  name: string;
  url: string;
  waitSelector: string;
  jsScript: object;
  scrapFunctionName: string;
}

interface scrapingProps {
  scenario: Scenario;
}

export const scraping = async ({ scenario }: scrapingProps) => {
  const { browser, scraper } = await getScraper();

  try {
    const { url, waitSelector, jsScript, scrapFunctionName } = scenario;

    const namespace = "script";

    if (IS_DEV) console.info("[INFO] 스크래핑 - ", scenario);

    await scraper.goto(url, { referer: url });
    await scraper.waitForSelector(waitSelector);

    const stringScript = stringify(jsScript);
    if (!stringScript) throw new Error("script 변환 오류");

    // 모든 이미지 URL을 절대경로로 전환
    await scraper.evaluate(
      `document.querySelectorAll('img,iframe,frame').forEach(url=>url.src=url.src)`,
    );

    await scraper.evaluate(`${namespace}=${stringScript}`);
    const data = await scraper.evaluate(`${namespace}.${scrapFunctionName}()`);

    return data;
  } catch (error) {
    log(`[srapping - ${scenario.name}] ${error}`);
  } finally {
    browser.close();
  }

  return null;
};

const WINDOW_SIZE = {
  WIDTH: 1920,
  HEIGHT: 1080,
};

const getScraper = async () => {
  const browser = await puppeteer.launch({
    headless: configuration.headless,
    args: [
      `--window-size=${WINDOW_SIZE.WIDTH},${WINDOW_SIZE.HEIGHT}`,
      // SSL 관련 인증서 오류 무시
      "--ignore-certificate-errors",
    ],
  });

  const [ page ] = await browser.pages();

  // DNS 캐시 무시를 위한 코드
  page.setCacheEnabled(false);

  // 다이어로그 메시지 무시
  page.on("dialog", async (dialog) => {
    await dialog.dismiss();
  });

  // 필요없는 리소스 무쉬
  if (configuration.headless) {
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
  } else {
    // 페이지 기본설정
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    });
  }

  return { browser, scraper: page };
};
