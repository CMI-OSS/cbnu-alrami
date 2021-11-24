const 교육학과 = require("./교육학과");

const script = {
  url: "http://edu.chungbuk.ac.kr/his/selectBbsNttList.do?key=231&bbsNo=29",
  site_id: 40701,
  site: "역사교육과",
  category: "공지사항",
};

module.exports = { ...교육학과, ...script };
