const script = {
  url: "http://pharm.chungbuk.ac.kr/app/index.html?pg_idx=21",
  site_id: 80101,
  site: "약학대학",
  category: "공지사항",
  noticeListSelector: "#data_list > tbody >tr",
  noticeContentsSelector: ".rd_body",
  getNoticeList: function () {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list)
      .map((item) => {
        const td = item.querySelectorAll("td");

        if (!td) return null;

        const number = td[1]
          .querySelector("a")
          .href.trim()
          .toString()
          .split('"')[1];

        return {
          site: this.site,
          category: this.category,
          site_id: this.site_id,
          title: td[1].querySelector("a").innerText.trim(),
          url: `${this.url}&pidx=${number}`,
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
