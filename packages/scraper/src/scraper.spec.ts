import 은하수식당 from "src/scrapers/CafeteriaScraper/scripts//은하수식당";

import { scrapping } from "./scraper";
import 경영정보학과 from "./scrapers/NoticeScraper/scripts/경영대학/경영정보학과";

jest.setTimeout(10000);

describe("스크래퍼", () => {
  test.skip("카페테리아 스크래퍼", async () => {
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

  test("[공지사항 스크래퍼] - 경영정보학과 목록 추출", async () => {
    const data = await scrapping({
      scenario: {
        name: 경영정보학과.site,
        url: 경영정보학과.url,
        waitSelector: 경영정보학과.noticeListSelector,
        jsScript: 경영정보학과,
        scrapFunctionName: 경영정보학과.getNoticeList.name,
      },
    });
    console.log(data);
  });
});

export {};
