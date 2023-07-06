import { schedule } from "node-cron";

import { scrapingCafeterias } from "./cafeteria-scraper/cafeteria-scraper";
import { log } from "./common/log";
import { scrapingNotices } from "./notice-scraper/notice-scraper";

// 매일 오전 12시에 한번씩 실행
schedule("0 0 * * *", () => {
  log(`[INFO] Start scrapingCafeterias`);
  scrapingCafeterias();
});

// 평일 오전 9시부터 오후 9시까지 3시간 마다 한번씩 실행
schedule("0 9-21/3 * * 1-5", () => {
  log(`[INFO] Start scrapingNotices`);
  scrapingNotices();
});

process.on("uncaughtException", (err) => {
  log(`[uncaughtException] - ${JSON.stringify(err)}`);
});
