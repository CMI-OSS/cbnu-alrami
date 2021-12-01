const 교육학과 = require("./교육학과");

const script = {
  url: "http://edu.chungbuk.ac.kr/geo/selectBbsNttList.do?key=270&bbsNo=21",
  site_id: 41101,
  site: "지리교육과",
  category: "공지사항",
};

module.exports = { ...교육학과, ...script };
