import { apiServer } from "@shared/constant";
import { OpenAPI } from "@shared/swagger-api/generated/core/OpenAPI";
import { schedule } from "node-cron";

import { scrapingCafeterias } from "./cafeteria-scraper/cafeteria-scraper";
import configuration from "./config/configuration";
import { scrapingNotices } from "./notice-scraper/notice-scraper";

OpenAPI.BASE =
  configuration.env === "production"
    ? apiServer.production_local
    : apiServer.local;

// 3시간에 한번씩 실행
schedule("0 */3 * * *", () => {
  scrapingCafeterias();
});

// 매일 오전 6시부터 오후 11시까지 30분 마다 한번씩 실행
schedule("*/30 6-23 * * *", () => {
  scrapingNotices();
});
