const 건축공학과 = require("./건축공학과");

const script = {
  url: "http://env.cbnu.ac.kr/index.php?mid=env_sub05",
  site_id: 21001,
  site: "환경공학과",
  category: "공지사항",
};

module.exports = { ...건축공학과, ...script };
