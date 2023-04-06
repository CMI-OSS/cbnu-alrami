import { boardTree } from "@shared/board-tree/board-tree.generated";

const script = {
  url: "https://hortisci.chungbuk.ac.kr/html/board/board.php?id=hor_news",
  site_id: boardTree.전공.농업생명환경대학.원예학과.공지사항.id,
  site: "원예학과",
  category: "공지사항",
  noticeListSelector: "#contentsArea > div > table.basicList > tbody > tr",
  noticeContentsSelector:
    "#contentsArea > div > div.tableWrap > table > tbody > tr:nth-child(3)",
  getNoticeList() {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list).map((item) => {
      const td = item.querySelectorAll("td");
      return {
        site: this.site,
        category: this.category,
        site_id: this.site_id,
        title: td[1].querySelector("a").innerText.trim().replace("new", ""),
        url: td[1].querySelector("a").href.trim(),
        date: null,
      };
    });
  },
  getContentDate() {
    return document.querySelector(
      "#contentsArea > div > div.tableWrap > table > tbody > tr:nth-child(1) > td:nth-child(4)",
    ).innerText;
  },
  getContentsHtml() {
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

export default script;
