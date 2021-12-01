const script = {
  url: "https://www.chungbuk.ac.kr/site/www/boardList.do?page=1&boardSeq=112&key=698",
  site_id: 140301,
  site: "충북대학교",
  category: "공지사항",
  noticeListSelector: "#contents > div > form > table > tbody > tr",
  noticeContentsSelector: "#view > table > tbody > tr:nth-child(3)",
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
        date: row[5].innerText.trim(),
      };
    });
  },
  getContentsHtml: function () {
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

module.exports = script;
