const script = {
  url: "http://agecon.cbnu.ac.kr/dsoft/index.html?pg_idx=26",
  site_id: 30101,
  site: "농업경제학과",
  category: "공지사항",
  noticeListSelector: "#data_list > tbody > tr",
  noticeContentsSelector: "#bbs_contnets > div.rd_body.clear",
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
        date: td[3].innerText.trim(),
      };
    });
  },
  getContentsHtml: function () {
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

module.exports = script;
