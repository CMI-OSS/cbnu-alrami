const 물리학과 = require("./물리학과");

const script = {
  url: "http://ast.chungbuk.ac.kr/?pg_idx=147",
  site_id: 120801,
  site: "천문우주학과",
  category: "공지사항",
};

module.exports = { ...물리학과, ...script };
