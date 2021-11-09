const 교육학과 = require("./교육학과");

const script = {
  url: "http://edu.chungbuk.ac.kr/ethics/selectBbsNttList.do?key=312&bbsNo=114",
  site_id: 40901,
  site: "윤리교육과",
  category: "공지사항",
};

module.exports = { ...교육학과, ...script };
