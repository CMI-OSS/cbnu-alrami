import 은하수식당 from "src/scrapers/CafeteriaScraper/scripts//은하수식당";

import { scrapping } from "./scraper";

jest.setTimeout(10000);

describe("스크래퍼", () => {
  test("카페테리아 스크래퍼", async () => {
    const data = await scrapping({
      scenario: {
        name: 은하수식당.cafeteria_name,
        url: 은하수식당.url,
        waitSelector: 은하수식당.waitSelector,
        jsScript: 은하수식당,
        scrapFunctionName: 은하수식당.getMenus.name,
      },
    });
    console.log(data);
  });
});

export {};
