const 국어국문학과 = require("./국어국문학과");

const script = {
  url: "http://humanum.chungbuk.ac.kr/philosophy/selectBbsNttList.do?bbsNo=99&key=366",
  site_id: 110801,
  site: "철학과",
  category: "공지사항",
};

module.exports = { ...국어국문학과, ...script };
