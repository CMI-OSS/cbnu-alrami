const script = {
  url: "https://physics.chungbuk.ac.kr/?pg_idx=145",
  site_id: 120101,
  site: "물리학과",
  category: "공지사항",
  noticeListSelector: `.dambbs_list > table > tbody > tr`,
  noticeContentsSelector: ".dambbs_body",
  getNoticeList: function () {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list)
      .map((item) => {
        const row = item.querySelectorAll("td");

        if (!row) return null;

        return {
          site: this.site,
          category: this.category,
          site_id: this.site_id,
          title: row[1].querySelector("a").innerText.trim(),
          url: row[1].querySelector("a").href.trim(),
          date: row[2].innerText.trim(),
        };
      })
      .filter(Boolean);
  },
  getContentsHtml: function () {
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

module.exports = script;
