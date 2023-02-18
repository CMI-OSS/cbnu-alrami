import { scrapingSchdule } from "./schedule-scraper";

jest.setTimeout(50000);

describe("[학사일정 스크래퍼]", () => {
  test("2023년도", async () => {
    const data = await scrapingSchdule();
    console.log(data);
  });
});

export {};
