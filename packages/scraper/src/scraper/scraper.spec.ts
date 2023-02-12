import 은하수식당 from "src/cafeteria-scraper/scripts/은하수식당";

import 경영정보학과 from "../notice-scraper/scripts/경영대학/경영정보학과";
import { scraping } from "./scraper";

jest.setTimeout(10000);

describe("스크래퍼", () => {
  test.skip("카페테리아 스크래퍼", async () => {
    await scraping({
      scenario: {
        name: 은하수식당.cafeteria_name,
        url: 은하수식당.url,
        waitSelector: 은하수식당.waitSelector,
        jsScript: 은하수식당,
        scrapFunctionName: 은하수식당.getMenus.name,
      },
    });
  });

  test.skip("[공지사항 스크래퍼] - 경영정보학과 목록 추출", async () => {
    await scraping({
      scenario: {
        name: 경영정보학과.site,
        url: 경영정보학과.url,
        waitSelector: 경영정보학과.noticeListSelector,
        jsScript: 경영정보학과,
        scrapFunctionName: 경영정보학과.getNoticeList.name,
      },
    });
  });
});

export {};
