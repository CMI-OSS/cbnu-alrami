const 본관 = require("./본관");

const script = {
  domitory: "양진재",
  cafeteriaId:2,
  typeQuery: "3",
};

module.exports = { ...본관, ...script };

