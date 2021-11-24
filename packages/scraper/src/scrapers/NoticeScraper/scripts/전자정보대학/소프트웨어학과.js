const script = {
  url: "https://software.cbnu.ac.kr/bbs/bbs.php?db=notice&pgID=ID12415888101",
  site_id: 130101,
  site: "소프트웨어학과",
  category: "공지사항",
  noticeListSelector: `#content > table:nth-child(8) > tbody > tr`,
  noticeContentsSelector: "#content > table > tbody > tr:nth-child(8)",
  getNoticeList: function () {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list)
      .map((item, index) => {
        const row = item.querySelectorAll("td");

        if (!row || index < 3) return null;

        return {
          site: this.site,
          category: this.category,
          site_id: this.site_id,
          title: row[2].innerText.trim(),
          url: row[2].querySelector("a").href.trim(),
          date: row[6].innerText.trim(),
        };
      })
      .filter(Boolean);
  },
  getContentsHtml: function () {
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

module.exports = script;
