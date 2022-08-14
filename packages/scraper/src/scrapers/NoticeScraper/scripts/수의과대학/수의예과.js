const { boardTree } = require("../../../../../../shared/src/board-tree/board-tree.generated");

const script = {
  url: "https://vmp.cbnu.ac.kr/dsoft/vmp/index.html?pg_idx=40",
  site_id: boardTree.전공.수의과대학.수의예과.공지사항.id,
  site: "수의예과",
  category: "공지사항",
  noticeListSelector: "#data_list > tbody >tr",
  noticeContentsSelector: ".rd_body",
  getNoticeList: function () {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list)
      .map((item) => {
        const td = item.querySelectorAll("td");

        if (!td) return null;

        const number = td[1]
          .querySelector("a")
          .href.trim()
          .toString()
          .split('"')[1];

        return {
          site: this.site,
          category: this.category,
          site_id: this.site_id,
          title: td[1].querySelector("a").innerText.trim(),
          url: `https://vmp.cbnu.ac.kr/dsoft/vmp/index.html?mod=view&pg_idx=40&pidx=${number}`,
          date: td[3].innerText.trim(),
        };
      })
      .filter(Boolean);
  },
  getContentsHtml: function () {
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

module.exports = script;
