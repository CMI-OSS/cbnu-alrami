const 충북대공지사항 = require("./충북대공지사항");

const script = {
  url: "https://www.chungbuk.ac.kr/site/www/boardList.do?boardSeq=114&key=701",
  site_id: 140303,
  site: "충북대학교",
  category: "행사세미나",
  getNoticeList: function () {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list).map((item) => {
      const row = item.querySelectorAll("td");
      return {
        site: this.site,
        category: this.category,
        site_id: this.site_id,
        title: row[1].querySelector("a").innerText.trim(),
        url: row[1].querySelector("a").href.trim(),
        date: row[3].innerText.trim(),
      };
    });
  },
};

module.exports = { ...충북대공지사항, ...script };
