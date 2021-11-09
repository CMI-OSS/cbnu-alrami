const 건축공학과 = require("./건축공학과");

const script = {
  url: "http://cbnuarchi.cbnu.ac.kr/index.php?mid=cbnuarchi_sub06",
  site_id: 20201,
  site: "건축학과",
  category: "공지사항",
  noticeContentsSelector:
    "#content > div.bd.hover_effect > div.rd.rd_nav_style2.clear > div.rd_body.clear > article",
};

module.exports = { ...건축공학과, ...script };
