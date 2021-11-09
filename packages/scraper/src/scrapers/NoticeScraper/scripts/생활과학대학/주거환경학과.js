const 소비자학과 = require("./소비자학과");

const script = {
  url: "https://housing.cbnu.ac.kr/main/sub.html?pageCode=27",
  site_id: 60501,
  site: "주거환경학과",
  category: "학과공지사항",
};

module.exports = { ...소비자학과, ...script };
