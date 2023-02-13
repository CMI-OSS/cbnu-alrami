import { boardTree } from "@shared/board-tree/board-tree.generated";

const script = {
  url: "http://consumer.cbnu.ac.kr/main/sub.html?pageCode=39",
  site_id: boardTree.전공.생활과학대학.소비자학과.공지사항.id,
  site: "소비자학과",
  category: "학과공지사항",
  noticeListSelector: ".md_mVer_noDisplay",
  noticeContentsSelector: "#lightgallery",
  getNoticeList() {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list)
      .map((item) => {
        const td = item.querySelectorAll("td");
        const title = item.querySelector(
          "a[href*='/main/sub.html?Mode=view&boardID=']",
        );

        if (!td || !title) return null;

        return {
          site: this.site,
          category: this.category,
          site_id: this.site_id,
          title: title.innerText.trim(),
          url: title.href,
          date: td[3].innerText.trim(),
        };
      })
      .filter(Boolean);
  },
  getContentsHtml() {
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

export default script;
