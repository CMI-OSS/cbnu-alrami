import { boardTree } from "@shared/board-tree/board-tree.generated";

const script = {
  url: "https://airobot.chungbuk.ac.kr/airbot_0702",
  site_id: boardTree.전공.전자정보대학.지능로봇공학과.공지사항.id,
  site: "지능로봇공학과",
  category: "공지사항",
  noticeListSelector: `.bd_lst tbody > tr`,
  noticeContentsSelector: ".rd_body",
  getNoticeList() {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list)
      .map((item) => {
        const row = item.querySelectorAll("td");

        if (!row) return null;

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
