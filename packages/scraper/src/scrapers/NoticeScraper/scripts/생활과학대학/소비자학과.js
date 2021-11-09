const script = {
  url: "http://consumer.cbnu.ac.kr/main/sub.html?pageCode=25",
  site_id: 60101,
  site: "소비자학과",
  category: "학과공지사항",
  noticeListSelector: ".md_mVer_noDisplay",
  noticeContentsSelector: "#lightgallery",
  getNoticeList: function () {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list)
      .map((item) => {
        const td = item.querySelectorAll("td");
        const title = item.querySelector(
          "a[href*='/main/sub.html?Mode=view&boardID=']",
        );

        if (!td || !title) return null;

        return {
          site: this.site,
          category: this.category,
          site_id: this.site_id,
          title: title.innerText.trim(),
          url: title.href,
          date: td[3].innerText.trim(),
        };
      })
      .filter(Boolean);
  },
  getContentsHtml: function () {
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

module.exports = script;
