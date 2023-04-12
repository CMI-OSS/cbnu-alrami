import { boardTree } from "@shared/board-tree/board-tree.generated";

import 고고미술사학과 from "./고고미술사학과";

const script = {
  url: "https://humanum.chungbuk.ac.kr/korean/selectBbsNttList.do?key=562&bbsNo=172&searchCtgry=&pageUnit=10&searchCnd=all&searchKrwd=&integrDeptCode=&pageIndex=1",
  site_id: boardTree.전공.인문대학.국어국문학과.공지사항.id,
  site: "국어국문학과",
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
          date: row[4].innerText.trim(),
        };
      })
      .filter(Boolean);
  },
  getContentsHtml() {
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

export default { ...고고미술사학과, ...script };
