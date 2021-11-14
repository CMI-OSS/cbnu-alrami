const 국어국문학과 = require("./국어국문학과");

const script = {
  url: "http://humanum.chungbuk.ac.kr/cbnuhistory/selectBbsNttList.do?bbsNo=98&key=388",
  site_id: 110501,
  site: "사학과",
  category: "공지사항",
};

module.exports = { ...국어국문학과, script };
