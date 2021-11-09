const script = {
  url: "http://food.cbnu.ac.kr/htm/notice2.php",
  site_id: 30701,
  site: "식품생명공학과",
  category: "공지사항",
  noticeListSelector: ".loop_main2",
  noticeContentsSelector: "#b_viewContent",
  getNoticeList: function () {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list).map((item) => {
      const div = item.querySelectorAll("div");
      return {
        site: this.site,
        category: this.category,
        site_id: this.site_id,
        title: div[1].querySelector("a").innerText.trim().replace("new", ""),
        url: div[1].querySelector("a").href.trim(),
        date: div[3].innerText.trim(),
      };
    });
  },
  getContentsHtml: function () {
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

module.exports = script;
