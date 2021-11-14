const 국어국문학과 = require("./국어국문학과");

const script = {
  url: "http://humanum.chungbuk.ac.kr/ecbnu/selectBbsNttList.do?bbsNo=180&key=621",
  site_id: 110601,
  site: "영어영문학과",
  category: "공지사항",
};

module.exports = { ...국어국문학과, script };
