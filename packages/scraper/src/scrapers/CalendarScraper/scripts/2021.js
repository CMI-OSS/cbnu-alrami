const year2020 = require("./2020");

const script = {
  url: "https://www.chungbuk.ac.kr/site/www/sub.do?key=1804",
  year: 2021,
};

module.exports = { ...year2020, ...script };

