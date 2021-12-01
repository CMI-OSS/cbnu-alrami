const 전기공학부 = require("./전기공학부");

const script = {
  url: "http://computer.chungbuk.ac.kr/bbs/bbs.php?db=notice",
  site_id: 130501,
  site: "컴퓨터공학과",
  category: "공지사항",
  noticeListSelector: `#content > table:nth-child(9) > tbody > tr`,
};

module.exports = { ...전기공학부, ...script };
