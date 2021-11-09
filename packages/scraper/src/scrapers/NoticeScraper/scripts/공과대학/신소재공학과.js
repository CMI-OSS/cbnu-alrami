const 건축학과 = require("./건축학과");

const script = {
  url: "http://material.cbnu.ac.kr/index.php?mid=material_sub04",
  site_id: 20601,
  site: "신소재공학과",
  category: "공지사항",
  noticeListSelector: "#bd_550_0 > div.bd_lst_wrp > table > tbody > tr",
};

module.exports = { ...건축학과, ...script };
