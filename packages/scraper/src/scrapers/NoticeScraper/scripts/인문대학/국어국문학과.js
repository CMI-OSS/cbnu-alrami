const 고고미술사학과 = require("./고고미술사학과");

const script = {
  url: "http://humanum.chungbuk.ac.kr/korean/selectBbsNttList.do?key=562&bbsNo=172&searchCtgry=&pageUnit=10&searchCnd=all&searchKrwd=&integrDeptCode=&pageIndex=1",
  site_id: 110201,
  site: "국어국문학과",
  category: "공지사항",
  noticeListSelector: `#contents > table > tbody > tr`,
  noticeContentsSelector: "#contents > table > tbody > tr:nth-child(2) > td",
  getNoticeList: function () {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list)
      .map((item) => {
        const row = item.querySelectorAll("td");

        if (!row) return null;

        return {
          site: this.site,
          category: this.category,
          site_id: this.site_id,
          title: row[1].querySelector("a").innerText.trim(),
          url: row[1].querySelector("a").href.trim(),
          date: row[4].innerText.trim(),
        };
      })
      .filter(Boolean);
  },
  getContentsHtml: function () {
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

module.exports = { ...고고미술사학과, ...script };
