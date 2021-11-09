const 원예학과 = require("./원예학과");

const script = {
  url: "https://animalscience.chungbuk.ac.kr/board/board.php?id=as_news",
  site_id: 301001,
  site: "축산학과",
  category: "공지사항",
};

module.exports = { ...원예학과, ...script };
