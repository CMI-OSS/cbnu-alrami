const { boardTree } = require("../../../../../../shared/src/board-tree/board-tree.generated");

const script = {
  url: "http://swapi.cbnu.ac.kr/v1/notice?page=1&limit=20&sort=-createdAt",
  site_id: boardTree.공통.sw중심대학사업단.공지사항.id,
  site: "sw중심대학사업단",
  category: "공지사항",
  noticeListSelector: "pre",
  noticeContentsSelector: ".ck-content",
  getNoticeList: function () {
    const list = JSON.parse(
      document.querySelector(this.noticeListSelector).innerText,
    ).data.documents;
    return Array.from(list)
      .map((item) => {
        const row = item;
        const date = new Date(row.createdAt);

        return {
          site: this.site,
          category: this.category,
          site_id: this.site_id,
          title: row.title,
          url: "http://sw7up.cbnu.ac.kr/community/notice/" + row._id,
          date: `${date.getFullYear()}-${
            date.getMonth() + 1
          }-${date.getDate()}`,
        };
      })
      .filter(Boolean);
  },
  getContentsHtml: function () {
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

module.exports = script;
