import { boardTree } from "@shared/board-tree/board-tree.generated";

const script = {
  url: "https://dorm.chungbuk.ac.kr/home/sub.php?menukey=20039",
  site_id: boardTree.공통.학생생활관.공지사항.id,
  site: "학생생활관",
  category: "공지사항",
  noticeListSelector:
    "#contentBody > form > div.containerIn > table > tbody > tr",
  noticeContentsSelector: "#contentBody > div.containerIn > div",
  getNoticeList() {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list)
      .map((item, index) => {
        const row = item.querySelectorAll("td");

        return {
          site: this.site,
          category: this.category,
          site_id: this.site_id,
          title: row[1].innerText.trim(),
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
