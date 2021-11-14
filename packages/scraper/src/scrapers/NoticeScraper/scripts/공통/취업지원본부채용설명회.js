const script = {
  url: "http://hrd.cbnu.ac.kr/board/board_list.asp?groupno=1&listno=2",
  site_id: 140602,
  site: "취업지원본부",
  category: "채용설명회",
  noticeListSelector:
    "#content_main > div:nth-child(3) > table > tbody > tr[align=center]",
  noticeContentsSelector:
    "#content_main > table > tbody > tr > td > div:nth-child(1) > table > tbody",
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
    let tmp = document.querySelectorAll(
      `${this.noticeContentsSelector} > tr`,
    ).length;

    // 청부파일이 있는경우
    if (tmp == 10) {
      return document.querySelector(
        `${this.noticeContentsSelector} > tr:nth-child(5)`,
      ).outerHTML;
    }

    return document.querySelector(
      `${this.noticeContentsSelector} > tr:nth-child(4)`,
    ).outerHTML;
  },
};

module.exports = script;
