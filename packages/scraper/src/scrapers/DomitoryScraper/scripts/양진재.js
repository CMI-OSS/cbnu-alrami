const 본관 = require("./본관");

const script = {
  domitory: "양진재",
  cafeteriaId:3,
  typeQuery: "2",
};

module.exports = { ...본관, ...script };

