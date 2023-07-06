import { ArticleApiService } from "@shared/swagger-api/generated/services/ArticleApiService";
import dayjs from "dayjs";
import { log } from "src/common/log";
import { login } from "src/common/login";
import noticeScripts from "src/notice-scraper/scripts/index";

import { scraping } from "../scraper/scraper";
import { excludeNotices, excludeSites } from "./constant";

const getISODate = (date: string) => {
  const replacedDate = date.replace(/[년|일|월]/g, ".");

  return dayjs(replacedDate).toISOString();
};

const retryScriptMap = new Map<string, number>();
const maxRetryCount = 2;

export const scrapingNotices = async () => {
  await login();

  for (const noticeScript of noticeScripts) {
    if (
      excludeSites.some((site) => {
        return site.script.site_id === noticeScript.site_id;
      })
    ) {
      // eslint-disable-next-line no-continue
      continue;
    }

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
      log(
        `[ERROR] 공지사항 목록 가져오기 - ${JSON.stringify({
          error,
          noticeScript,
        })}`,
      );
      // eslint-disable-next-line no-continue
      continue;
    }

    for (const notice of noticeList) {
      const retryCount = retryScriptMap.get(notice.url) ?? 0;

      // eslint-disable-next-line no-continue
      if (retryCount >= maxRetryCount) {
        if (retryCount === maxRetryCount) {
          log(
            `[WARN] 스크립트 재실행 회수(${retryCount}) 초과 - ${JSON.stringify(
              notice,
            )}`,
          );
        }

        // eslint-disable-next-line no-continue
        continue;
      }

      if (
        excludeNotices.some((excludeNotice) => {
          return excludeNotice.url === notice.url;
        })
      ) {
        // eslint-disable-next-line no-continue
        continue;
      }

      const duplicateResponse =
        await ArticleApiService.articleControllerIsDuplicated({
          url: notice.url,
        });

      // eslint-disable-next-line no-continue
      if (duplicateResponse.isDuplicated) continue;

      // 공지사항 내용가져오기
      const content = await scraping({
        scenario: {
          name: noticeScript.site,
          jsScript: noticeScript,
          scrapFunctionName: noticeScript.getContentsHtml.name,
          url: notice.url,
          waitSelector: noticeScript.noticeContentsSelector,
        },
      }).catch((error) => {
        log(
          `[ERROR] 공지사항 등록 - ${JSON.stringify({
            error,
            noticeScript,
          })}`,
        );

        const retryCount = retryScriptMap.get(notice.url) ?? 0;
        retryScriptMap.set(notice.url, retryCount + 1);
      });

      // eslint-disable-next-line no-extra-boolean-cast
      if (!!(noticeScript as any).getContentDate) {
        notice.date = await scraping({
          scenario: {
            name: noticeScript.site,
            jsScript: noticeScript,
            scrapFunctionName: (noticeScript as any).getContentDate.name,
            url: notice.url,
            waitSelector: noticeScript.noticeContentsSelector,
          },
        });
      }

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
        const retryCount = retryScriptMap.get(notice.url) ?? 0;
        retryScriptMap.set(notice.url, retryCount + 1);

        log(
          `[ERROR] 공지사항 등록 - ${JSON.stringify({
            error,
            notice,
          })}`,
        );
        console.error("[ERROR] 공지사항 등록 - ", error, notice);
      }
    }
  }
};
