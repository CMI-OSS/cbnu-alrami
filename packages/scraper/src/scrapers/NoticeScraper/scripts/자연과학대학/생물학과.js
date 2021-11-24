const 물리학과 = require("./물리학과");

const script = {
  url: "http://biology.chungbuk.ac.kr/?pg_idx=145",
  site_id: 120301,
  site: "생물학과",
  category: "공지사항",
};

module.exports = { ...물리학과, ...script };
