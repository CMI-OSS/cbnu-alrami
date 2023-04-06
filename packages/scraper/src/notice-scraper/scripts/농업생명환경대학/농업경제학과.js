import { boardTree } from "@shared/board-tree/board-tree.generated";

const script = {
  url: "https://agecon.cbnu.ac.kr/?pg_idx=119",
  site_id: boardTree.전공.농업생명환경대학.농업경제학과.공지사항.id,
  site: "농업경제학과",
  category: "공지사항",
  noticeListSelector: "#bbs_contnets tbody > tr",
  noticeContentsSelector: ".dambbs_body",
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
        date:
          this.site === "농업경제학과"
            ? td[2].innerText.trim()
            : td[3].innerText.trim(),
      };
    });
  },
  getContentsHtml() {
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

export default script;
