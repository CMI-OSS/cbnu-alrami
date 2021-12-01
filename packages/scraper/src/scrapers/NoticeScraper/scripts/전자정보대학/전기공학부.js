const script = {
  url: "http://koamma.chungbuk.ac.kr/bbs/bbs.php?db=notice",
  site_id: 130201,
  site: "전기공학부",
  category: "공지&뉴스",
  noticeListSelector: `#subContent > div.section > table:nth-child(6) > tbody > tr`,
  noticeContentsSelector: "#articles",
  getNoticeList: function () {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list)
      .map((item, index) => {
        const row = item.querySelectorAll("td");

        if (!row || index < 3) return null;

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
  getContentsHtml: function () {
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

module.exports = script;
