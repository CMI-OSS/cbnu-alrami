import { boardTree } from "@shared/board-tree/board-tree.generated";

const script = {
  url: "https://linc.chungbuk.ac.kr/board/notice.do",
  site_id: boardTree.공통.linc사업단.공지사항.id,
  site: "linc사업단",
  category: "공지사항",
  noticeListSelector: ".board_table > tbody > tr",
  noticeContentsSelector: ".board_table > tbody > tr > td ",
  getNoticeList() {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list)
      .map((item) => {
        const row = item.querySelectorAll("td");

        return {
          site: this.site,
          category: this.category,
          site_id: this.site_id,
          title: row[1].querySelector("a").innerText.trim(),
          url: row[1].querySelector("a").href.trim(),
          date: row[3].innerText.trim(),
        };
      })
      .filter(Boolean);
  },
  getContentsHtml() {
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

export default script;
