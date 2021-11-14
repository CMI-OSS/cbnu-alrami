const script = {
  url: "https://airobot.chungbuk.ac.kr/airbot_0702",
  site_id: 130601,
  site: "지능로봇공학과",
  category: "공지사항",
  noticeListSelector: `#board_list > table > tbody > tr`,
  noticeContentsSelector: ".read_body",
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
          title: row[1].innerText.trim(),
          url: row[1].querySelector("a").href.trim(),
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
