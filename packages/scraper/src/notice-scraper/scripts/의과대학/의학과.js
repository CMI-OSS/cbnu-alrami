import { boardTree } from "@shared/board-tree/board-tree.generated";

const script = {
  url: "http://medweb.chungbuk.ac.kr/master.php?pg_idx=23",
  site_id: boardTree.전공.의과대학.의학과.공지사항.id,
  site: "의학과",
  category: "공지사항",
  noticeListSelector: `.board_rows`,
  noticeContentsSelector: ".rd_body",
  getNoticeList() {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list)
      .map((item) => {
        const row = item.querySelectorAll("div");

        if (!row) return null;

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
