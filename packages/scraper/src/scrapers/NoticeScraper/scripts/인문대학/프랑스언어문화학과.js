const 국어국문학과 = require("./국어국문학과");

const script = {
  url: "http://humanum.chungbuk.ac.kr/french/selectBbsNttList.do?bbsNo=81&key=771",
  site_id: 110901,
  site: "프랑스언어문화학과",
  category: "공지사항",
};

module.exports = { ...국어국문학과, ...script };
