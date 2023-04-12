import { boardTree } from "@shared/board-tree/board-tree.generated";

const script = {
  url: "https://fineart.cbnu.ac.kr/bbs/bbs.php?db=notice&pgID=ID13971124002",
  site_id: boardTree.전공.융합학과군.조형예술학과.공지사항.id,
  site: "조형예술학과",
  category: "공지사항",
  noticeListSelector: `#contentR > table tr[onmouseover*="this.style.backgroundColor='#F5F7FC'"]`,
  noticeContentsSelector: "#articles",
  getNoticeList() {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list)
      .map((item) => {
        const td = item.querySelectorAll("td");

        if (!td) return null;

        return {
          site: this.site,
          category: this.category,
          site_id: this.site_id,
          title: td[2].querySelector("nobr > a").innerText.trim(),
          url: td[2].querySelector("nobr > a").href.trim(),
          date: td[6].innerText.trim(),
        };
      })
      .filter(Boolean);
  },
  getContentsHtml() {
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

export default script;
