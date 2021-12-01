const 농업경제학과 = require("./농업경제학과");

const script = {
  url: "http://jigong.chungbuk.ac.kr/index.html?pg_idx=23",
  site_id: 30901,
  site: "지역건설공학과",
  category: "공지사항",
};

module.exports = { ...농업경제학과, ...script };
