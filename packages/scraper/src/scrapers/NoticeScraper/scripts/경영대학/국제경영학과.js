const 경영정보학과 = require("./경영정보학과");

const script = {
  url: "http://ib.chungbuk.ac.kr/master.php?pg_idx=33",
  site_id: 10301,
  site: "국제경영학과",
  category: "학부공지",
};

module.exports = { ...경영정보학과, ...script };
