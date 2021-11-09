const 교육학과 = require("./교육학과");

const script = {
  url: "http://edu.chungbuk.ac.kr/soc/selectBbsNttList.do?key=297&bbsNo=40",
  site_id: 40401,
  site: "사회교육과",
  category: "공지사항",
  getNoticeList: function () {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list).map((item) => {
      const td = item.querySelectorAll("td");
      return {
        site: this.site,
        category: this.category,
        site_id: this.site_id,
        title: td[2].querySelector("a").innerText.trim(),
        url: td[2].querySelector("a").href.trim(),
        date: td[5].innerText.trim(),
      };
    });
  },
};

module.exports = { ...교육학과, ...script };
