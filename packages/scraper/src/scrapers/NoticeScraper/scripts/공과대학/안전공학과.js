const 건축공학과 = require("./건축공학과");

const script = {
  url: "http://safety.cbnu.ac.kr/index.php?mid=safety_sub04",
  site_id: 20701,
  site: "안전공학과",
  category: "공지사항",
};

module.exports = { ...건축공학과, ...script };
