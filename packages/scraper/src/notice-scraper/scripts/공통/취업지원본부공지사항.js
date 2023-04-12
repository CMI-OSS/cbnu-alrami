import { boardTree } from "@shared/board-tree/board-tree.generated";

const script = {
  url: "https://hrd.chungbuk.ac.kr/board/board_list.asp?groupno=1&listno=1",
  site_id: boardTree.공통.취업지원본부.공지사항.id,
  site: "취업지원본부",
  category: "공지사항",
  noticeListSelector: "#content tbody tr[align='center']",
  noticeContentsSelector: "#frm1 > table",
  getNoticeList() {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list)
      .map((item, index) => {
        const row = item.querySelectorAll("td");

        if (index < 1) return null;

        return {
          site: this.site,
          category: this.category,
          site_id: this.site_id,
          title: row[2].innerText.trim(),
          url: row[2].querySelector("a").href.trim(),
          date: row[3].innerText.trim(),
        };
      })
      .filter(Boolean);
  },
  getContentsHtml() {
    const len = document.querySelectorAll(
      `${this.noticeContentsSelector} > tbody > tr > td > div:nth-child(1) > table > tbody > tr`,
    ).length;

    return document.querySelector(
      `${
        this.noticeContentsSelector
      } > tbody > tr > td > div:nth-child(1) > table > tbody > tr:nth-child(${
        len < 10 ? 4 : 5
      })`,
    ).outerHTML;
  },
};
export default script;
