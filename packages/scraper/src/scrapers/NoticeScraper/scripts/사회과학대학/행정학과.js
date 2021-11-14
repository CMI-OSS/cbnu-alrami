const 경제학과 = require("./경제학과");

const script = {
  url: "https://public.chungbuk.ac.kr/board/department_notice",
  site_id: 50501,
  site: "행정학과",
  category: "학부/융합전공공지",
};

module.exports = { ...경제학과, ...script };
