const year2020 = require("./2020");

const script = {
  url: "https://www.chungbuk.ac.kr/site/www/sub.do?key=1879",
  year: 2023,
};

module.exports = { ...year2020, ...script };
