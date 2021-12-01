const script = {
  url: "http://humanum.chungbuk.ac.kr/russian/selectBbsNttList.do?bbsNo=93&key=339",
  site_id: 110401,
  site: "러시아언어문화학과",
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
          // FIXME: date가 상세페이지에 있어서 공지사항 리스트에서 스크래핑 불가
          date: "",
        };
      })
      .filter(Boolean);
  },
  getContentsHtml: function () {
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

module.exports = script;
