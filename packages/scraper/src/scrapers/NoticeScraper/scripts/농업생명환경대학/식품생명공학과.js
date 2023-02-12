import { boardTree } from "@shared/board-tree/board-tree.generated";

import 식물자원학과 from "./식물자원학과";

const script = {
  url: "https://food.chungbuk.ac.kr/?pg_idx=239",
  site_id: boardTree.전공.농업생명환경대학.식품생명공학과.공지사항.id,
  site: "식품생명공학과",
  category: "식공소식",
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
        date: td[2].innerText.trim(),
      };
    });
  },
};

export default { ...식물자원학과, ...script };
