const 국어국문학과 = require("./국어국문학과");

const script = {
  url: "http://humanum.chungbuk.ac.kr/chinese/selectBbsNttList.do?bbsNo=73&key=293",
  site_id: 110701,
  site: "중어중문학과",
  category: "공지사항",
};

module.exports = { ...국어국문학과, script };
