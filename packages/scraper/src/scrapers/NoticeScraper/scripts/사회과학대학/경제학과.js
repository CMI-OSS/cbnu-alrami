const script = {
  url: "https://econ.chungbuk.ac.kr/board/department_notice",
  site_id: 50101,
  site: "경제학과",
  category: "학부공지",
  noticeListSelector: "#fboardlist > table > tbody > tr",
  noticeContentsSelector: "#post-content",
  getNoticeList: function () {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list).map((item) => {
      const td = item.querySelectorAll("td");
      const title = item.querySelector("a[href*='post']");

      return {
        site: this.site,
        category: this.category,
        site_id: this.site_id,
        title: title.innerText.trim(),
        url: title.href,
        // TODO 날짜에 년도가 없어서.. 직접 년도를 넣어주어야할듯
        date: td[3].innerText.trim(),
      };
    });
  },
  getContentsHtml: function () {
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

module.exports = script;
