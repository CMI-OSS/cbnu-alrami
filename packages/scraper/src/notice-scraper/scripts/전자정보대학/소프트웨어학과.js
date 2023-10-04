import { boardTree } from "@shared/board-tree/board-tree.generated";

const script = {
  url: "https://software.cbnu.ac.kr/sub0401",
  site_id: boardTree.전공.전자정보대학.소프트웨어학부.공지사항.id,
  site: "소프트웨어학과",
  category: "공지사항",
  noticeListSelector: `tbody tr`,
  noticeContentsSelector: ".rd_body",
  getNoticeList() {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list)
      .map((item, index) => {
        const row = item.querySelectorAll("td");

        return {
          site: this.site,
          category: this.category,
          site_id: this.site_id,
          title: row[2].innerText.trim(),
          url: row[2].querySelector("a").href.trim(),
          date: row[4].innerText.trim(),
        };
      })
      .filter(Boolean);
  },
  getContentsHtml() {
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

export default script;
