import { boardTree } from "@shared/board-tree/board-tree.generated";

const script = {
  url: "http://me.chungbuk.ac.kr/index.php?mid=me_sub04",
  site_id: boardTree.전공.공과대학.기계공학부.공지사항.id,
  site: "기계공학부",
  category: "공지사항",
  noticeListSelector: "#bd_839_0 > div.bd_lst_wrp > table > tbody > tr",
  noticeContentsSelector:
    "#content > div.bd.hover_effect > div.rd.rd_nav_style2.clear > div.rd_body.clear > article",
  getNoticeList() {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list).map((item) => {
      const td = item.querySelectorAll("td");
      return {
        site: this.site,
        category: this.category,
        site_id: this.site_id,
        title: td[2].innerText.trim(),
        url: td[2].querySelector("a").href.trim(),
        date: td[4].innerText.trim(),
      };
    });
  },
  getContentsHtml() {
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

module.exports = script;
