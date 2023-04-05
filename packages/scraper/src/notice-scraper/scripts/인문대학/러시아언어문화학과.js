import { boardTree } from "@shared/board-tree/board-tree.generated";

const script = {
  url: "http://humanum.chungbuk.ac.kr/russian/selectBbsNttList.do?bbsNo=93&key=339",
  site_id: boardTree.전공.인문대학.러시아언어문화학과.공지사항.id,
  site: "러시아언어문화학과",
  category: "공지사항",
  noticeListSelector: `#contents > table > tbody > tr`,
  noticeContentsSelector: "#contents > table > tbody > tr:nth-child(2) > td",
  getNoticeList() {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list)
      .map((item) => {
        const row = item.querySelectorAll("td");

        if (!row) return null;

        return {
          site: this.site,
          category: this.category,
          site_id: this.site_id,
          title: row[1].querySelector("a").innerText.trim(),
          url: row[1].querySelector("a").href.trim(),
          // FIXME: date가 상세페이지에 있어서 공지사항 리스트에서 스크래핑 불가
          date: "",
        };
      })
      .filter(Boolean);
  },

  getContentDate() {
    return document.querySelector(
      "#contents > div.bbs_info.clearfix > div.bbs_left.bbs_count > span:nth-child(1) > strong",
    ).innerText;
  },
  getContentsHtml() {
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

export default script;
