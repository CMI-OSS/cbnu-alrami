const script = {
  url: "https://hrd.cbnu.ac.kr/board/board_list.asp?groupno=1&listno=1",
  site_id: 140601,
  site: "취업지원본부",
  category: "공지사항",
  noticeListSelector: ".adm_table tr",
  noticeContentsSelector: ".board_content",
  getNoticeList: function () {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list)
      .map((item, index) => {
        const row = item.querySelectorAll("td");

        if (index < 1) return null;

        return {
          site: this.site,
          category: this.category,
          site_id: this.site_id,
          title: row[2].innerText.trim(),
          url: row[2].querySelector("a").href.trim(),
          date: row[3].innerText.trim(),
        };
      })
      .filter(Boolean);
  },
  getContentsHtml: function () {
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

module.exports = script;
