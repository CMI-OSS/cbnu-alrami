const 교육학과 = require("./교육학과");

const script = {
  url: "http://edu.chungbuk.ac.kr/chemedu/selectBbsNttList.do?key=372&bbsNo=72",
  site_id: 41301,
  site: "화학교육과",
  category: "공지사항",
};

module.exports = { ...교육학과, ...script };
