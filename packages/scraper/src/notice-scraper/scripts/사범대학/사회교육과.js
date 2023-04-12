import { boardTree } from "@shared/board-tree/board-tree.generated";

import 교육학과 from "./교육학과";

const script = {
  url: "https://edu.chungbuk.ac.kr/soc/selectBbsNttList.do?key=297&bbsNo=40",
  site_id: boardTree.전공.사범대학.사회교육과.공지사항.id,
  site: "사회교육과",
  category: "공지사항",
  noticeContentsSelector: "#board > div > div.tit_area > ul > li:nth-child(4)",
  getNoticeList() {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list).map((item) => {
      const td = item.querySelectorAll("td");
      return {
        site: this.site,
        category: this.category,
        site_id: this.site_id,
        title: td[2].querySelector("a").innerText.trim(),
        url: td[2].querySelector("a").href.trim(),
        date: td[5].innerText.trim(),
      };
    });
  },
};

export default { ...교육학과, ...script };
