import { ArticleApiService } from "@shared/swagger-api/generated/services/ArticleApiService";
import noticeScripts from "src/scrapers/NoticeScraper/scripts/index";

import { scraping } from "./scraper";

export const scrapingNotices = async () => {
  for (const noticeScript of noticeScripts) {
    // 공지사항 목록 가져오기
    const noticeList = await scraping({
      scenario: {
        name: noticeScript.site,
        jsScript: noticeScript,
        scrapFunctionName: noticeScript.getNoticeList.name,
        url: noticeScript.url,
        waitSelector: noticeScript.noticeListSelector,
      },
    });

    for (const notice of noticeList) {
      // 공지사항 내용가져오기
      const content = await scraping({
        scenario: {
          name: noticeScript.site,
          jsScript: noticeScript,
          scrapFunctionName: noticeScript.getContentsHtml.name,
          url: notice.url,
          waitSelector: noticeScript.noticeContentsSelector,
        },
      });

      // 공지사항 등록
      await ArticleApiService.articleControllerCreate({
        requestBody: {
          boardId: notice.site_id,
          title: notice.title,
          url: notice.url,
          dateTime: notice.date,
          content,
        },
      });
    }
  }
};
