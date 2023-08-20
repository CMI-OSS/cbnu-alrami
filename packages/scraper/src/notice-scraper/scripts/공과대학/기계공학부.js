import { boardTree } from "@shared/board-tree/board-tree.generated";

const script = {
  url: "https://me.chungbuk.ac.kr/me5_1",
  site_id: boardTree.전공.공과대학.기계공학부.공지사항.id,
  site: "기계공학부",
  category: "공지사항",
  noticeListSelector: "#bd_172_0 > div.bd_lst_wrp > table > tbody > tr",
  noticeContentsSelector: "div.rd_body > article",
  getNoticeList() {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list).map((item) => {
      const td = item.querySelectorAll("td");
      return {
        site: this.site,
        category: this.category,
        site_id: this.site_id,
        title: td[1].innerText.trim(),
        url: td[1].querySelector("a").href.trim(),
        date: td[3].innerText.trim(),
      };
    });
  },
  getContentsHtml() {
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

export default script;
