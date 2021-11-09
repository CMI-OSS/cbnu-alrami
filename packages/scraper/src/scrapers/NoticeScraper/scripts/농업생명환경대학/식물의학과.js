const 농업경제학과 = require("./농업경제학과");

const script = {
  url: "http://plantmed.cbnu.ac.kr/dsoft/index.html?pg_idx=20",
  site_id: 30501,
  site: "식물의학과",
  category: "공지사항",
};

module.exports = { ...농업경제학과, ...script };
