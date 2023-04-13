import { schedule } from "node-cron";

import { scrapingCafeterias } from "./cafeteria-scraper/cafeteria-scraper";
import { log } from "./common/log";
import { scrapingNotices } from "./notice-scraper/notice-scraper";

// 3시간에 한번씩 실행
schedule("0 */3 * * *", () => {
  log(`[INFO] Start scrapingCafeterias`);
  scrapingCafeterias();
});

// 매일 오전 6시부터 오후 11시까지 30분 마다 한번씩 실행
schedule("*/30 6-23 * * *", () => {
  log(`[INFO] Start scrapingNotices`);
  scrapingNotices();
});

process.on("uncaughtException", (err) => {
  log(`[uncaughtException] - ${JSON.stringify(err)}`);
});
