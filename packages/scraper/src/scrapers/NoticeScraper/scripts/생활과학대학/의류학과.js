const 소비자학과 = require("./소비자학과");

const script = {
  url: "https://fashion.cbnu.ac.kr/main/sub.html?pageCode=42",
  site_id: 60401,
  site: "의류학과",
  category: "학과공지사항",
};

module.exports = { ...소비자학과, ...script };
