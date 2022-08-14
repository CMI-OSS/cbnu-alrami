const { boardTree } = require("../../../../../../shared/src/board-tree/board-tree.generated");
const 교육학과 = require("./교육학과");

const script = {
  url: "http://edu.chungbuk.ac.kr/ethics/selectBbsNttList.do?key=312&bbsNo=114",
  site_id: boardTree.전공.사범대학.윤리교육과.공지사항.id,
  site: "윤리교육과",
  category: "공지사항",
};

module.exports = { ...교육학과, ...script };
