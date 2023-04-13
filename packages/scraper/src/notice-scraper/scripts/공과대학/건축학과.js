import { boardTree } from "@shared/board-tree/board-tree.generated";

const script = {
  url: "https://cbnuarchi.cbnu.ac.kr/bbs/board.php?bo_table=news&sca=%EB%89%B4%EC%8A%A4",
  site_id: boardTree.전공.공과대학.건축학과.공지사항.id,
  site: "건축학과",
  category: "공지사항",
  noticeListSelector: "#bo_list > div > ul:nth-child(2) > li",
  noticeContentsSelector: "#bo_v_con",
  getNoticeList() {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list).map((item) => {
      const row = item.querySelectorAll("a > span");
      return {
        site: this.site,
        category: this.category,
        site_id: this.site_id,
        title: row[1].innerText.trim(),
        url: item.querySelector("a").href.trim(),
        date: row[3].innerText.trim(),
      };
    });
  },
  getContentsHtml() {
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

export default script;
