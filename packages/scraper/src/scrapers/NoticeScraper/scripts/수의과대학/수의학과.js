const { boardTree } = require("../../../../../../shared/src/board-tree/board-tree.generated");

const script = {
  url: "https://vetmed.chungbuk.ac.kr/board/notice",
  site_id: boardTree.전공.수의과대학.수의학과.공지사항.id,
  site: "수의학과",
  category: "공지사항",
  noticeListSelector: ".boardList > table > tbody > tr",
  noticeContentsSelector: "#boardViewContent",
  getNoticeList: function () {
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
          url: td[1].querySelector("a").href.trim(),
          date: td[2].innerText.trim(),
        };
      })
      .filter(Boolean);
  },
  getContentsHtml: function () {
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

module.exports = script;
