import { ArticleApiService } from "@shared/swagger-api/generated/services/ArticleApiService";
import dayjs from "dayjs";
import noticeScripts from "src/notice-scraper/scripts/index";

import { scraping } from "../scraper/scraper";

const getISODate = (date: string) => {
  const replacedDate = date.replace(/[년|일|월]/g, ".");

  return dayjs(replacedDate).toISOString();
};

export const scrapingNotices = async () => {
  for (const noticeScript of noticeScripts) {
    // 공지사항 목록 가져오기
    let noticeList = [];
    try {
      noticeList = await scraping({
        scenario: {
          name: noticeScript.site,
          jsScript: noticeScript,
          scrapFunctionName: noticeScript.getNoticeList.name,
          url: noticeScript.url,
          waitSelector: noticeScript.noticeListSelector,
        },
      });
      if (!noticeList.length) {
        throw new Error("공지사항 목록을 가져올 수 없습니다");
      }
    } catch (error) {
      console.error("[ERROR] 공지사항 목록 가져오기 - ", noticeScript, error);
    }
    try {
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

        try {
          // 공지사항 등록
          const reuslt = await ArticleApiService.articleControllerCreate({
            requestBody: {
              boardId: notice.site_id,
              title: notice.title,
              url: notice.url,
              dateTime: getISODate(notice.date),
              content,
            },
          });

          if (reuslt.success) {
            console.log("[INFO] 공지사항 등록 완료 - ", notice);
          }
        } catch (error) {
          console.error("[ERROR] 공지사항 등록 - ", error, notice);
        }
      }
    } catch (error) {
      console.error("[ERROR] 공지사항 등록 - ", error, noticeScript);
    }
  }
};
