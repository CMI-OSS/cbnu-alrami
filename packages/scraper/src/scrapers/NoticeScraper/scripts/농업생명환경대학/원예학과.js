const script = {
  url: "https://hortisci.chungbuk.ac.kr/html/board/board.php?id=hor_news",
  site_id: 30801,
  site: "원예학과",
  category: "공지사항",
  noticeListSelector: "#contentsArea > div > table.basicList > tbody > tr",
  noticeContentsSelector:
    "#contentsArea > div > div.tableWrap > table > tbody > tr:nth-child(3)",
  getNoticeList: function () {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list).map((item) => {
      const div = item.querySelectorAll("div");
      return {
        site: this.site,
        category: this.category,
        site_id: this.site_id,
        title: td[1].querySelector("a").innerText.trim().replace("new", ""),
        url: td[1].querySelector("a").href.trim(),
        date: null,
      };
    });
  },
  getContentsHtml: function () {
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

module.exports = script;
