const script = {
  url: "https://vetmed.chungbuk.ac.kr/board/notice",
  site_id: 70201,
  site: "수의학과",
  category: "공지사항",
  noticeListSelector: ".boardList > table > tbody > tr",
  noticeContentsSelector: "#boardViewContent",
  getNoticeList: function () {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list)
      .map((item) => {
        const td = item.querySelectorAll("td");

        if (!td) return null;

        return {
          site: this.site,
          category: this.category,
          site_id: this.site_id,
          title: td[1].querySelector("a").innerText.trim(),
          url: td[1].querySelector("a").href.trim(),
          date: td[2].innerText.trim(),
        };
      })
      .filter(Boolean);
  },
  getContentsHtml: function () {
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

module.exports = script;
