const 취업지원본부공지사항 = require("./취업지원본부공지사항");

const script = {
  url: "http://hrd.cbnu.ac.kr/board/board_list.asp?groupno=1&listno=2",
  site_id: 140602,
  site: "취업지원본부",
  category: "채용설명회",
};

module.exports = { ...취업지원본부공지사항, ...script };
