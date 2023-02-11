import { login } from "./login";
import { scrapingNotices } from "./notice-scraper";

jest.setTimeout(50000);

describe("[공지사항 스크래퍼]", () => {
  beforeAll(async () => {
    await login();
  });

  test("공지사항 시나리오 목록 가져오기", async () => {
    const data = await scrapingNotices();
    console.log(data);
  });
});

export {};
