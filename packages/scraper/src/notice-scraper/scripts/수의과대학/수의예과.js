import { boardTree } from "@shared/board-tree/board-tree.generated";

const script = {
  url: "https://vetmed.chungbuk.ac.kr/board/notice.do",
  site_id: boardTree.전공.수의과대학.수의예과.공지사항.id,
  site: "수의예과",
  category: "공지사항",
  noticeListSelector:
    "#container > div > div.content_body > div > div.boardList > table > tbody > tr",
  noticeContentsSelector: ".boardViewContent",
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
          title: td[1].querySelector("a").innerText.trim(),
          url: td[1].querySelector("a").href,
          date: td[2].innerText.trim(),
        };
      })
      .filter(Boolean);
  },
  getContentsHtml() {
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

export default script;
