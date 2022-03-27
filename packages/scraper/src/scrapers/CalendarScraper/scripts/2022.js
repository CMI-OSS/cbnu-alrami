const year2020 = require("./2020");

const script = {
  url: "https://www.chungbuk.ac.kr/site/www/sub.do?key=1853",
  year: 2022,
};

module.exports = { ...year2020, ...script };

module.exports = script;
