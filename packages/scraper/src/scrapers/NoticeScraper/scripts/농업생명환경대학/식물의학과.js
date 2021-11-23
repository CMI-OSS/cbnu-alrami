const script = {
  url: "https://www.plantmed.chungbuk.ac.kr/forum/gongjisahang",
  site_id: 30501,
  site: "식물의학과",
  category: "공지사항",
  noticeListSelector: `tr[data-hook="post-list-item"]`,
  noticeContentsSelector: "h1[data-hook='post-title']+div",
  getNoticeList: function () {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list).map((item) => {
      const td = item.querySelectorAll("td");
      return {
        site: this.site,
        category: this.category,
        site_id: this.site_id,
        title: td[0].querySelector("a").innerText.trim(),
        url: td[0].querySelector("a").href.trim(),
        date: td[4]
          .querySelector(`span[data-hook="time-ago"]`)
          .innerText.trim(),
      };
    });
  },
  getContentsHtml: function () {
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

module.exports = script;
