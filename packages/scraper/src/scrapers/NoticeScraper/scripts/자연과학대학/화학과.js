const 물리학과 = require("./물리학과");

const script = {
  url: "http://chem.chungbuk.ac.kr/?pg_idx=145",
  site_id: 120901,
  site: "화학과",
  category: "공지사항",
};

module.exports = { ...물리학과, ...script };
