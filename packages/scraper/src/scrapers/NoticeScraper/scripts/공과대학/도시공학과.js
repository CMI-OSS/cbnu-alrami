const 건축학과 = require("./건축학과");

const script = {
  url: "http://urban.cbnu.ac.kr/index.php?mid=urban_sub04",
  site_id: 20501,
  site: "도시공학과",
  category: "공지사항",
};

module.exports = { ...건축학과, ...script };
