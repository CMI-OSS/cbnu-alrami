const 건축공학과 = require("./건축공학과");

const script = {
  url: "http://cbec.cbnu.ac.kr/index.php?mid=cbiec_sub05_01",
  site_id: 20301,
  site: "공업화학과",
  category: "공지사항",
};

module.exports = { ...건축공학과, ...script };
