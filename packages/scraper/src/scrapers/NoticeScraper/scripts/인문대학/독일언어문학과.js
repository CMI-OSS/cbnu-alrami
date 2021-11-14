const 국어국문학과 = require("./국어국문학과");

const script = {
  url: "http://humanum.chungbuk.ac.kr/german/selectBbsNttList.do?bbsNo=149&key=506",
  site_id: 110301,
  site: "독일언어문화학과",
  category: "공지사항",
};

module.exports = { ...국어국문학과, ...script };
