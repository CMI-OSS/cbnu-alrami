import { boardTree } from "@shared/board-tree/board-tree.generated";

const script = {
  url: "https://www.plantmed.chungbuk.ac.kr/forum/gongjisahang",
  site_id: boardTree.전공.농업생명환경대학.식물의학과.공지사항.id,
  site: "식물의학과",
  category: "공지사항",
  noticeListSelector: `tr[data-hook="post-list-item"]`,
  noticeContentsSelector: ".post-content__body",
  getNoticeList() {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list).map((item) => {
      const td = item.querySelectorAll("td");
      return {
        site: this.site,
        category: this.category,
        site_id: this.site_id,
        title: td[0].querySelector("a").innerText.trim(),
        url: td[0].querySelector("a").href.trim(),
        date: td[4]
          .querySelector(`span[data-hook="time-ago"]`)
          .innerText.trim(),
      };
    });
  },
  getContentsHtml() {
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

export default script;
