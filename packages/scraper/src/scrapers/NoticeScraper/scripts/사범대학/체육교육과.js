const 교육학과 = require("./교육학과");

const script = {
  url: "http://edu.chungbuk.ac.kr/physicaledu/selectBbsNttList.do?key=479&bbsNo=96",
  site_id: 41201,
  site: "체육교육과",
  category: "공지사항",
};

module.exports = { ...교육학과, ...script };
