const script = {
  url: "https://vmp.cbnu.ac.kr/dsoft/vmp/index.html?pg_idx=40",
  site_id: 70101,
  site: "수의예과",
  category: "공지사항",
  noticeListSelector: "#data_list > tbody >tr",
  noticeContentsSelector: ".rd_body",
  getNoticeList: function () {
    const list = document.querySelectorAll(this.noticeListSelector);
    return Array.from(list)
      .map((item) => {
        const td = item.querySelectorAll("td");

        if (!td) return null;

        return {
          site: this.site,
          category: this.category,
          site_id: this.site_id,
          title: td[1].querySelector("a").innerText.trim(),
          // FIXME 하... 여기는 게시물이 url 형태가 아닌 모달형태로 되어있음.. 그래서 일단 기본 게시물 리스트 URL로 설정
          url: this.url,
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
