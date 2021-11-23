const 건축공학과 = require("./건축공학과");

const script = {
  url: "https://urban.cbnu.ac.kr/urban_sub05",
  site_id: 20501,
  site: "도시공학과",
  category: "공지사항",
};

module.exports = { ...건축공학과, ...script };
