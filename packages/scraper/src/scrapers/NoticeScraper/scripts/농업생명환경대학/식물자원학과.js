const script = {
  url: "http://crop.chungbuk.ac.kr/dsoft/index.html?pg_idx=40",
  site_id: 30601,
  site: "식물자원학과",
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
        title: td[2].innerText.trim(),
        url: td[2].querySelector("a").href.trim(),
        date: td[4].innerText.trim(),
      };
    });
  },
};

module.exports = script;
