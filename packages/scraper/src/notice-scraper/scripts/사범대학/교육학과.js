import { boardTree } from "@shared/board-tree/board-tree.generated";

const script = {
  url: "https://edu.chungbuk.ac.kr/edu/selectBbsNttList.do?key=170&bbsNo=8",
  site_id: boardTree.전공.사범대학.교유학과.공지사항.id,
  site: "교육학과",
  category: "공지사항",
  noticeListSelector: "#board > div.tableA > table > tbody > tr",
  noticeContentsSelector:
    "#board > div > div.tit_area > ul > li:nth-child(3) > div",
  getNoticeList() {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list).map((item) => {
      const td = item.querySelectorAll("td");
      return {
        site: this.site,
        category: this.category,
        site_id: this.site_id,
        title: td[1].querySelector("a").innerText.trim(),
        url: td[1].querySelector("a").href.trim(),
        date: td[4].innerText.trim(),
      };
    });
  },
  getContentsHtml() {
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

export default script;
