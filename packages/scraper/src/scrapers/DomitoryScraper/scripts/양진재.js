const 본관 = require("./본관");

const script = {
  url: `https://dorm.chungbuk.ac.kr/home/sub.php?menukey=20041&type=3`,
  domitory: "양진재",
  cafeteriaId: 2,
  typeQuery: "3",
};

module.exports = { ...본관, ...script };
