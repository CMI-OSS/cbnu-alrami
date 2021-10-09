import Crawler from "@src/crawler/Crawler";
import { Notice, NoticeScript } from "@src/interfaces";
import { Scenario } from "../Scenario";
import { stringify } from "javascript-stringify";
const test = require("./scripts/경영대학/경영정보학과.js");

class NoticeCrawler extends Crawler<NoticeScript> {
  constructor() {
    super();
    this.queue.push(new Scenario(test));
  }

  async crawling(scenario: Scenario<NoticeScript>) {
    // 공지사항 목록 크롤링
    const noticeList = await this.getNoticeList(scenario);

    console.log(noticeList);

    // 공지사항별 목록 크롤링
    for (const notice of noticeList) {
      notice.contents = await this.getDetail(scenario, notice);
      console.log(notice);
    }

    console.log(noticeList);

    // 데이터베이스 저장

    // 사용자에게 알림
  }

  async getNoticeList(scenario: Scenario<NoticeScript>): Promise<Notice[]> {
    try {
      if (this.cralwer === null) {
        throw Error("크롤러 없음");
      }

      const { jsScript: noticeScript } = scenario;

      if (noticeScript === undefined) {
        throw Error("스크립트 없음");
      }

      // 공지사항 목록 페이지로 이동
      await this.cralwer.goto(noticeScript.url);

      // 10초정도 기다려주기
      await this.cralwer.waitForTimeout(10000);

      const stringScript = `
        const script = ${stringify(noticeScript)}
      `;

      console.log(stringScript);

      // 스크립트 주입
      await this.cralwer.evaluate(stringScript);

      // 공지사항 목록 가져오기
      const notice_list: Notice[] = await this.cralwer.evaluate(
        `script.getNoticeList()`
      );

      if (notice_list.length == 0) {
        throw Error("공지사항 목록 크롤링 실패");
      }

      return notice_list;
    } catch (error) {
      // console.error(`[${site.site_id}/getDetail]` + error);
      throw error;
    }
  }

  async getDetail(
    scenario: Scenario<NoticeScript>,
    notice: Notice
  ): Promise<string> {
    try {
      if (this.cralwer === null) {
        throw new Error("크롤러 없음");
      }

      const { jsScript: noticeScript } = scenario;

      // 공지사항 상세 페이지로 이동
      await this.cralwer.goto(notice.url);

      // 5초정도 기다려주기
      await this.cralwer.waitForTimeout(5000);

      const stringScript = `
        const script = ${stringify(noticeScript)}
      `;

      console.log(stringScript);

      // 스크립트 주입
      await this.cralwer.evaluate(stringScript);

      // 공지사항 내용 가져오기
      const contents: string = await this.cralwer.evaluate(
        `script.getContentsHtml()`
      );

      if (contents === "") {
        throw new Error("공지사항 내용 크롤링 실패");
      }

      return contents;
    } catch (error) {
      // console.error(`[${site.site_id}/getDetail]` + " " + error);
      throw error;
    }
  }
}

export default new NoticeCrawler();
