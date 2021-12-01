const 전기공학부 = require("./전기공학부");

const script = {
  url: "http://elec.chungbuk.ac.kr/bbs/bbs.php?db=notice",
  site_id: 130301,
  site: "전자공학부",
  category: "공지사항",
  noticeListSelector: `#subContent > table:nth-child(7) > tbody > tr`,
  getNoticeList: function () {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list)
      .map((item, index) => {
        const row = item.querySelectorAll("td");

        if (!row || index < 4) return null;

        return {
          site: this.site,
          category: this.category,
          site_id: this.site_id,
          title: row[2].innerText.trim(),
          url: row[2].querySelector("a").href.trim(),
          date: row[6].innerText.trim(),
        };
      })
      .filter(Boolean);
  },
};

module.exports = { ...전기공학부, ...script };
