const script = {
  url: "https://agecon.cbnu.ac.kr/?pg_idx=119",
  site_id: 30101,
  site: "농업경제학과",
  category: "공지사항",
  noticeListSelector: "#bbs_contnets tbody > tr",
  noticeContentsSelector: ".dambbs_body",
  getNoticeList: function () {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list).map((item) => {
      const td = item.querySelectorAll("td");
      return {
        site: this.site,
        category: this.category,
        site_id: this.site_id,
        title: td[1].querySelector("a").innerText.trim(),
        url: td[1].querySelector("a").href.trim(),
        date: td[2].innerText.trim(),
      };
    });
  },
  getContentsHtml: function () {
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

module.exports = script;
