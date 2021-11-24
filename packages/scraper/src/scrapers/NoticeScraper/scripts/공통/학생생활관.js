const script = {
  url: "https://dorm.chungbuk.ac.kr/home/sub.php?menukey=20039",
  site_id: 140201,
  site: "학생생활관",
  category: "공지사항",
  noticeListSelector:
    "#contentBody > form > div.containerIn > table > tbody > tr",
  noticeContentsSelector: "#contentBody > div.containerIn > div",
  getNoticeList: function () {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list)
      .map((item, index) => {
        const row = item.querySelectorAll("td");

        return {
          site: this.site,
          category: this.category,
          site_id: this.site_id,
          title: row[1].innerText.trim(),
          url: row[1].querySelector("a").href.trim(),
          date: row[3].innerText.trim(),
        };
      })
      .filter(Boolean);
  },
  getContentsHtml: function () {
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

module.exports = script;
