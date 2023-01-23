const { boardTree } = require("../../../../../../shared/src/board-tree/board-tree.generated");

const script = {
  url: "http://civil.chungbuk.ac.kr/index.php?mid=civil_sub0301",
  site_id: boardTree.전공.공과대학.토목공학부.공지사항.id,
  site: "토목공학부",
  category: "공지사항",
  noticeListSelector: "#bd_300_0 > div.bd_lst_wrp > table > tbody > tr",
  noticeContentsSelector:
    "#content > div.bd.hover_effect > div.rd.rd_nav_style2.clear > div.rd_body.clear",
  getNoticeList: function () {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list).map((item) => {
      const td = item.querySelectorAll("td");
      return {
        site: this.site,
        category: this.category,
        site_id: this.site_id,
        title: td[1].innerText.trim(),
        url: td[1].querySelector("a").href.trim(),
        date: td[3].innerText.trim(),
      };
    });
  },
  getContentsHtml: function () {
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

module.exports = script;
