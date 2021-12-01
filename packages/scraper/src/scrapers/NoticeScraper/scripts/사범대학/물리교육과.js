const 교육학과 = require("./교육학과");

const script = {
  url: "http://edu.chungbuk.ac.kr/phyedu/selectBbsNttList.do?key=350&bbsNo=66",
  site_id: 40301,
  site: "물리교육과",
  category: "공지사항",
};

module.exports = { ...교육학과, ...script };
