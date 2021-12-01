const 사회교육과 = require("./사회교육과");

const script = {
  url: "http://edu.chungbuk.ac.kr/bio/selectBbsNttList.do?key=399&bbsNo=2",
  site_id: 40501,
  site: "생물교육과",
  category: "공지사항",
};

module.exports = { ...사회교육과, ...script };
