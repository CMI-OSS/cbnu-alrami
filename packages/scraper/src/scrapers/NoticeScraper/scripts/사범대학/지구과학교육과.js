const 교육학과 = require("./교육학과");

const script = {
  url: "http://edu.chungbuk.ac.kr/earth/selectBbsNttList.do?key=423&bbsNo=47",
  site_id: 41001,
  site: "지구과학교육과",
  category: "공지사항",
};

module.exports = { ...교육학과, ...script };
