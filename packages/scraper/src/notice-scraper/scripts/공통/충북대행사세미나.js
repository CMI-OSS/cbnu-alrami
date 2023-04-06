import { boardTree } from "@shared/board-tree/board-tree.generated";

import 충북대공지사항 from "./충북대공지사항";

const script = {
  url: "https://www.chungbuk.ac.kr/site/www/boardList.do?boardSeq=114&key=701",
  site_id: boardTree.공통.충북대학교.행사세미나.id,
  site: "충북대학교",
  category: "행사세미나",
  getNoticeList() {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list).map((item) => {
      const row = item.querySelectorAll("td");
      return {
        site: this.site,
        category: this.category,
        site_id: this.site_id,
        title: row[1].querySelector("a").innerText.trim(),
        url: row[1].querySelector("a").href.trim(),
        date: null,
      };
    });
  },
  getContentDate() {
    return document
      .querySelector("#view > div:nth-child(1) > span:nth-child(1)")
      .innerText.replace("작성일 : ", "");
  },
};

export default { ...충북대공지사항, ...script };
