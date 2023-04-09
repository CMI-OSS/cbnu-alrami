import { login } from "src/common/login";

import { scrapingCafeterias } from "./cafeteria-scraper";

jest.setTimeout(50000);

describe("[학생식당 스크래퍼]", () => {
  beforeAll(async () => {
    await login();
  });
  test("실행", async () => {
    await scrapingCafeterias();
  });
});

export {};
