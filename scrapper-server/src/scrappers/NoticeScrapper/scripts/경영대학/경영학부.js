const script = {
  url: 'http://biz.chungbuk.ac.kr/?pg_idx=7',
  site_id: 10201,
  site: '경영학부',
  category: '대학공지',
  waitNoticeListSelector: '.bbs_body>#rows',
  waitNoticeContentsSelector: '#bbs_contnets > div.rd_body.row',
  getNoticeList: function () {
    var list = document.querySelectorAll('.bbs_body>#rows');
    let i = 0;
    const notices = [];
    while (i < list.length) {
      let td = list[i].querySelectorAll('div');
      notices.push({
        site: this.site,
        category: this.category,
        site_id: this.site_id,
        title: td[1].innerText.trim(),
        url: td[1].querySelector('a').href.trim(),
        date: td[3].innerText.trim(),
      });
      i++;
    }
    return notices;
  },
  getContentsHtml: function () {
    // 첨부파일 제거
    if (document.querySelector('#attachedList'))
      document.querySelector('#attachedList').remove();
    return document.querySelector('#bbs_contnets > div.rd_body.row').outerHTML;
  },
};

module.exports = script;
