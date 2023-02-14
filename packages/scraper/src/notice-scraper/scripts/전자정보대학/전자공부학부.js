import { boardTree } from "@shared/board-tree/board-tree.generated";

import 전기공학부 from "./전기공학부";

const script = {
  url: "http://elec.chungbuk.ac.kr/bbs/bbs.php?db=notice",
  site_id: boardTree.전공.전자정보대학.전자공학부.공지사항.id,
  site: "전자공학부",
  category: "공지사항",
  noticeListSelector: `#subContent > table:nth-child(7) > tbody > tr`,
  getNoticeList() {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list)
      .map((item, index) => {
        const row = item.querySelectorAll("td");

        if (!row || index < 4) return null;

        return {
          site: this.site,
          category: this.category,
          site_id: this.site_id,
          title: row[2].innerText.trim(),
          url: row[2].querySelector("a").href.trim(),
          date: row[6].innerText.trim(),
        };
      })
      .filter(Boolean);
  },
};

export default { ...전기공학부, ...script };
