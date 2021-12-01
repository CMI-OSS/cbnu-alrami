const 농업경제학과 = require("./농업경제학과");

const script = {
  url: "http://agchem.chungbuk.ac.kr/index.html?pg_idx=35",
  site_id: 301201,
  site: "환경생명화학과",
  category: "공지사항",
};

module.exports = { ...농업경제학과, ...script };
