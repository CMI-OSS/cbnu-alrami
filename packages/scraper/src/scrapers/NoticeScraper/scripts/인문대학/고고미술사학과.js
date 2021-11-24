const script = {
  url: "http://humanum.chungbuk.ac.kr/gomisa/selectBbsNttList.do?bbsNo=218&key=683",
  site_id: 110101,
  site: "고고미술사학과",
  category: "공지사항",
  noticeListSelector: `#contents > table > tbody > tr`,
  noticeContentsSelector: "#contents > table > tbody > tr:nth-child(3) > td",
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
          title: row[2].querySelector("a").innerText.trim(),
          url: row[2].querySelector("a").href.trim(),
          date: row[5].innerText.trim(),
        };
      })
      .filter(Boolean);
  },
  getContentsHtml: function () {
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

module.exports = script;
