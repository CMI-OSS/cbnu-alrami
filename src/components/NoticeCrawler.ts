import puppeteer, { Browser, Page } from "puppeteer";
import { SiteScript, Notice } from "@src/interfaces";

class NoticeCrawler {
  cralwer: Page | null = null;
  siteScriptList: SiteScript[] = [];
  constructor() {
    this.init();
  }

  // 크롤러 초기화
  async init() {
    const browser = await puppeteer.launch({
      headless: false,
      args: [`--window-size=${1920},${1080}`],
    });

    // 페이지 생성
    const page = await browser.newPage();

    await page.setRequestInterception(true);

    // 페이지 기본설정
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    });

    // 다이어로그 메시지 무시
    page.on("dialog", async (dialog) => {
      await dialog.dismiss();
    });

    // 필요없는 리소스 무쉬
    page.on("request", (request) => {
      if (
        ["image", "stylesheet", "font"].indexOf(request.resourceType()) !== -1
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });

    this.cralwer = page;
  }

  async craweling(site: SiteScript) {
    
    // 공지사항 목록 크롤링
    const noticeList = await this.getNoticeList(site);

    // 공지사항별 목록 크롤링
    noticeList.forEach(async (notice: Notice) => {
      notice.contents = await this.getDetail(site, notice);
    });

    // 데이터베이스 저장

    // 사용자에게 알림
  }

  async getNoticeList(site: SiteScript): Promise<Notice[]> {
    try {
      if (this.cralwer === null) {
        throw Error("getNoticeList - 크롤러 없음");
      }
      // 공지사항 목록 페이지로 이동
      await this.cralwer.goto(site.url);

      // 10초정도 기다려주기
      await this.cralwer.waitForTimeout(10000);

      // 공지사항 목록 스크립트 주입
      await this.cralwer.evaluate(site.getData.toString());

      // 공지사항 목록 가져오기
      const notice_list: Notice[] = await this.cralwer.evaluate(
        `return getData()`
      );

      if (notice_list.length == 0) {
        throw Error("getNoticeList - 공지사항 목록 크롤링 실패");
      }

      return notice_list;
    } catch (error) {
      console.error(site.name + " " + error);
      throw error;
    }
  }

  async getDetail(site: SiteScript, notice: Notice): Promise<string> {
    try {
      if (this.cralwer === null) {
        throw Error("getNoticeList - 크롤러 없음");
      }

      // 공지사항 상세 페이지로 이동
      await this.cralwer.goto(notice.url);

      // 10초정도 기다려주기
      await this.cralwer.waitForTimeout(10000);

      // 공지사항 내용 스크립트 주입
      await this.cralwer.evaluate(site.getContentsHtml.toString());

      // 공지사항 내용 가져오기
      const contents: string = await this.cralwer.evaluate(
        `return getContentsHtml()`
      );

      if (contents === "") {
        throw Error("getDetail - 공지사항 내용 크롤링 실패");
      }

      return contents;
    } catch (error) {
      console.error(site.name + " " + error);
      throw error;
    }
  }
}

export default new NoticeCrawler();
