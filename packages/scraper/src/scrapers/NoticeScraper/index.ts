import { Notice, NoticeScript } from "src/types";
import { createNotice, hasNotice } from "src/db/notice";
import { ScraperState, ScraperType } from "@shared/types";
import Scraper from "../Scraper";
import { Scenario } from "../Scenario";

class NoticeScraper extends Scraper<NoticeScript> {
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
      if (!(await hasNotice(notice))) {
        await createNotice({
          ...notice,
          contents: await this.getContents(scenario, notice),
        });
        await this.scraper?.waitForTimeout(1000);
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

      await this.scraper.goto(noticeScript.url);
      await this.scraper.waitForSelector(noticeScript.noticeListSelector, {
        timeout: 3000,
      });
      await this.evaluateScript(noticeScript);

      const noticeList: Notice[] = await this.scraper.evaluate(
        `script.getNoticeList()`,
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
      await this.scraper.goto(notice.url);
      await this.scraper.waitForSelector(noticeScript.noticeContentsSelector);
      await this.evaluateScript(noticeScript);

      const contents: string = await this.scraper.evaluate(
        `script.getContentsHtml()`,
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
