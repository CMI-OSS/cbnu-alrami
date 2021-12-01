const 경영정보학과 = require("./경영정보학과");

const script = {
  url: "http://biz.chungbuk.ac.kr/?pg_idx=7",
  site_id: 10201,
  site: "경영학부",
  category: "대학공지",
};

module.exports = { ...경영정보학과, ...script };
