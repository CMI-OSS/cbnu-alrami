const script = {
  url: "http://mis.chungbuk.ac.kr/master.php?pg_idx=7",
  site_id: 10101,
  site: "경영정보학과",
  category: "학부공지",
  waitNoticeListSelector: ".bbs_body>#rows",
  waitNoticeContentsSelector: "#bbs_contnets > div.rd_body.row",
  getNoticeList: function () {
    var list = document.querySelectorAll(".bbs_body>#rows");
    const notices = [];
    let i = 0;
    while (i < list.length) {
      let td = list[i].querySelectorAll("div");
      notices.push({
        site: this.site,
        category: this.category,
        site_id: this.site_id,
        title: td[1].innerText.trim(),
        url: td[1].querySelector("a").href.trim(),
        date: td[3].innerText.trim(),
      });
      i++;
    }
    return notices;
  },
  getContentsHtml: function () {
    // 첨부파일 제거
    if (document.querySelector("#attachedList"))
      document.querySelector("#attachedList").remove();
    return document.querySelector("#bbs_contnets > div.rd_body.row").outerHTML;
  },
};

module.exports = script;
