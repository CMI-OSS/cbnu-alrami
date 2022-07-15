const script = {
  url: "https://mis.chungbuk.ac.kr/master.php?pg_idx=7",
  site_id: 10101,
  site: "경영정보학과",
  category: "학부공지",
  noticeListSelector: ".bbs_body>#rows",
  noticeContentsSelector: "#bbs_contnets > div.rd_body.row",
  getNoticeList: function () {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list).map((item) => {
      const td = item.querySelectorAll("div");
      return {
        site: this.site,
        category: this.category,
        site_id: this.site_id,
        title: td[1].innerText.trim(),
        url: td[1].querySelector("a").href.trim(),
        date: td[3].innerText.trim(),
      };
    });
  },
  getContentsHtml: function () {
    // 첨부파일 제거
    if (document.querySelector("#attachedList"))
      document.querySelector("#attachedList").remove();
    return document.querySelector(this.noticeContentsSelector).outerHTML;
  },
};

module.exports = script;
