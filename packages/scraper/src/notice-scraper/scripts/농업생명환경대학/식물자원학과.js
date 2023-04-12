import { boardTree } from "@shared/board-tree/board-tree.generated";

const script = {
  url: "https://crop.chungbuk.ac.kr/dsoft/index.html?pg_idx=40",
  site_id: boardTree.전공.농업생명환경대학.식물자원학과.공지사항.id,
  site: "식물자원학과",
  category: "공지사항",
  noticeListSelector: "#data_list > tbody > tr",
  noticeContentsSelector: "#bbs_contnets > div.rd_body.clear",
  getNoticeList() {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list).map((item) => {
      const td = item.querySelectorAll("td");
      return {
        site: this.site,
        category: this.category,
        site_id: this.site_id,
        title: td[2].innerText.trim(),
        url: td[2].querySelector("a").href.trim(),
        date: td[4].innerText.trim(),
      };
    });
  },
  getContentsHtml() {
    // FIXME: 첨부된 파일 지워야됨
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

export default script;
