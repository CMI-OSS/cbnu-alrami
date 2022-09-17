/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ScraperState, ScraperType } from "@shared/types";
import { createArticle, isDuplicationArticle } from "src/api/article";
import { Notice, NoticeScript } from "src/types";

import { Scenario } from "../Scenario";
import Scraper from "../Scraper";

class NoticeScraper extends Scraper<NoticeScript> {
  name = "공지사항";
  type: ScraperType = "notice";

  constructor() {
    super(`${__dirname}/scripts`);
  }

  async initScript() {
    const scripts = await this.loadScripts();

    scripts.forEach((script) => {
      this.appendScenario(new Scenario(script.site, script));
    });

    this.run();
  }

  async scrapping(scenario: Scenario<NoticeScript>) {
    const noticeList = await this.getNoticeList(scenario);

    for (const notice of noticeList) {
      if (this.state !== ScraperState.Running) break;
      this.log({
        prefix: "INFO",
        message: `${notice.title} 게시물의 내용을 스크래핑합니다`,
      });

      try {
        const {
          data: { isDuplication },
        } = await isDuplicationArticle({ url: notice.url.trim() });

        if (!isDuplication) {
          const content = await this.getContents(scenario, notice);

          await createArticle({
            boardId: notice.site_id.toString(),
            article: {
              title: notice.title,
              content,
              date: notice.date,
              url: notice.url,
              images: [],
            },
          });

          await this.scraper?.waitForTimeout(1000);
        }
      } catch (error) {
        // @ts-ignore
        console.log(error.response ?? error);
      }
    }

    // 사용자에게 알림
  }

  async getNoticeList(scenario: Scenario<NoticeScript>): Promise<Notice[]> {
    // eslint-disable-next-line no-useless-catch
    try {
      if (this.scraper === null) {
        throw Error("크롤러 없음");
      }

      const { jsScript: noticeScript } = scenario;

      if (noticeScript === undefined) {
        throw Error("스크립트 없음");
      }

      this.log({
        prefix: "INFO",
        message: `${noticeScript.url}로 이동합니다.`,
      });
      await this.scraper.goto(noticeScript.url);

      this.log({
        prefix: "INFO",
        message: `${noticeScript.noticeListSelector}를 기다립니다.`,
      });
      await this.scraper.waitForSelector(noticeScript.noticeListSelector, {
        timeout: 3000,
      });

      this.log({
        prefix: "INFO",
        message: `스크립트를 삽입합니다.`,
      });
      await this.evaluateScript(noticeScript);

      this.log({
        prefix: "INFO",
        message: `공지사항 목록을 가져옵니다.`,
      });
      const noticeList: Notice[] = await this.scraper.evaluate(
        `script.getNoticeList();`,
      );

      if (noticeList.length === 0) {
        throw Error("공지사항 목록 크롤링 실패");
      }

      return noticeList;
    } catch (error) {
      // console.error(`[${site.site_id}/getDetail]` + error);
      throw error;
    }
  }

  async getContents(
    scenario: Scenario<NoticeScript>,
    notice: Notice,
  ): Promise<string> {
    if (this.scraper === null) {
      throw new Error("크롤러 없음");
    }

    const { jsScript: noticeScript } = scenario;

    if (noticeScript === undefined) {
      throw Error("스크립트 없음");
    }

    try {
      this.log({ prefix: "INFO", message: `${notice.url}로 이동합니다` });
      await this.scraper.goto(notice.url, {
        referer: scenario.jsScript?.url,
      });

      this.log({
        prefix: "INFO",
        message: `${noticeScript.noticeContentsSelector}를 기다립니다`,
      });
      await this.scraper.waitForSelector(noticeScript.noticeContentsSelector, {
        timeout: 10000,
      });

      this.log({
        prefix: "INFO",
        message: `스크립트를 삽입합니다.`,
      });
      await this.evaluateScript(noticeScript);

      this.log({
        prefix: "INFO",
        message: `공지사항 내용을 가져옵니다`,
      });
      const contents: string = await this.scraper.evaluate(
        `document.querySelectorAll('img').forEach(el=>el.src=el.src);
        document.querySelectorAll('iframe').forEach(el=>el.src=el.src);
        script.getContentsHtml()`,
      );

      if (contents === "") {
        throw new Error("공지사항 내용 크롤링 실패");
      }

      return contents;
    } catch (error) {
      console.error(`${`[${notice.url} getContents]`}${error}`);
      throw error;
    }
  }
}

export default new NoticeScraper();
