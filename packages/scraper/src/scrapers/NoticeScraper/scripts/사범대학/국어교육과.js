const 교육학과 = require("./교육학과");

const script = {
  url: "http://edu.chungbuk.ac.kr/korean/selectBbsNttList.do?key=496&bbsNo=58",
  site_id: 40201,
  site: "국어교육과",
  category: "공지사항",
};

module.exports = { ...교육학과, ...script };
