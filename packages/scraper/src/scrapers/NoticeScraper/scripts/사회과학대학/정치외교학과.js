const 경제학과 = require("./경제학과");

const script = {
  url: "https://politics.chungbuk.ac.kr/board/department_notice",
  site_id: 50401,
  site: "정치외교학과",
  category: "학부공지",
};

module.exports = { ...경제학과, ...script };
