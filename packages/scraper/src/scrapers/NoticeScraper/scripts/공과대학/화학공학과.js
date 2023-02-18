import { boardTree } from "@shared/board-tree/board-tree.generated";

const script = {
  url: "http://cheme.cbnu.ac.kr/index.php?mid=cheme_sub04",
  site_id: boardTree.전공.공과대학.화학공학과.공지사항.id,
  site: "화학공학과",
  category: "공지사항",
  noticeListSelector: "#bd_426_0 > div.bd_lst_wrp > table > tbody > tr",
  noticeContentsSelector:
    "#content > div.bd.hover_effect > div.rd.rd_nav_style2.clear > div.rd_body.clear",
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
        date: td[3].innerText.trim(),
      };
    });
  },
  getContentsHtml() {
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

export default script;
