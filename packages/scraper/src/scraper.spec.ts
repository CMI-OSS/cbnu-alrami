import { scrapping } from "./scraper";

describe("scraper", () => {
  test("카페테리아 스크래퍼", async () => {
    await scrapping();
  });
});

export {};
