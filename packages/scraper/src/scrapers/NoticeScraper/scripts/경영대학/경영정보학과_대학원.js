const 경영정보학과 = require("./경영정보학과");

const script = {
  url: "https://mis.chungbuk.ac.kr/master.php?pg_idx=33",
  site_id: 10102,
  site: "경영정보학과",
  category: "대학원공지",
};

module.exports = { ...경영정보학과, ...script };
