import { boardTree } from "@shared/board-tree/board-tree.generated";

const script = {
  url: "https://pharm.chungbuk.ac.kr/app/index.html?pg_idx=21",
  site_id: boardTree.전공.약학대학.약학과.공지사항.id,
  site: "약학과",
  category: "공지사항",
  noticeListSelector: "#data_list > tbody >tr",
  noticeContentsSelector: ".rd_body",
  getNoticeList() {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list)
      .map((item) => {
        const td = item.querySelectorAll("td");

        if (!td) return null;

        const number = td[1]
          .querySelector("a")
          .href.trim()
          .toString()
          .split('"')[1];

        return {
          site: this.site,
          category: this.category,
          site_id: this.site_id,
          title: td[1].querySelector("a").innerText.trim(),
          url: `${this.url}&pidx=${number}`,
          date: td[3].innerText.trim(),
        };
      })
      .filter(Boolean);
  },
  getContentsHtml() {
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

export default script;
