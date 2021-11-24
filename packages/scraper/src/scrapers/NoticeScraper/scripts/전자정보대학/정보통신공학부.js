const 전기공학부 = require("./전기공학부");

const script = {
  url: "http://inform.chungbuk.ac.kr/bbs/bbs.php?db=notice",
  site_id: 130401,
  site: "정보통신공학부",
  category: "공지사항",
  noticeListSelector: `#content1 > div.section.clear > table:nth-child(6) > tbody > tr`,
};

module.exports = { ...전기공학부, ...script };
