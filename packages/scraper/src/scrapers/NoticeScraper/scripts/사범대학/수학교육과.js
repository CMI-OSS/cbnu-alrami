import { boardTree } from "@shared/board-tree/board-tree.generated";

const 교육학과 = require("./교육학과");

const script = {
  url: "http://edu.chungbuk.ac.kr/mathedu/selectBbsNttList.do?key=763&bbsNo=88",
  site_id: boardTree.전공.사범대학.수학교육과.공지사항.id,
  site: "수학교육과",
  category: "공지사항",
};

module.exports = { ...교육학과, ...script };
