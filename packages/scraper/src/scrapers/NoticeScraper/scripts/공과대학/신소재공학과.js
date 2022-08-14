const { boardTree } = require("../../../../../../shared/src/board-tree/board-tree.generated");
const 건축공학과 = require("./건축공학과");

const script = {
  url: "http://material.cbnu.ac.kr/index.php?mid=material_sub04",
  site_id: boardTree.전공.공과대학.신소재공학과.공지사항.id,
  site: "신소재공학과",
  category: "공지사항",
  noticeListSelector: "#bd_550_0 > div.bd_lst_wrp > table > tbody > tr",
};

module.exports = { ...건축공학과, ...script };
