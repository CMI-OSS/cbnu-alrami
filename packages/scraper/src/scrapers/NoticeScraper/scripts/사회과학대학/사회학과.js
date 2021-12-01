const 경제학과 = require("./경제학과");

const script = {
  url: "https://sociology.chungbuk.ac.kr/board/department_notice",
  site_id: 50201,
  site: "사회학과",
  category: "학부공지",
};

module.exports = { ...경제학과, ...script };
