import { scrapingCafeterias } from "./cafeteria-scraper";

jest.setTimeout(50000);

describe("[학생식당 스크래퍼]", () => {
  test("실행", async () => {
    const data = await scrapingCafeterias();
    console.log(data);
  });
});

export {};
