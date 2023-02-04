import { boardTree } from "@shared/board-tree/board-tree.generated";

const 경제학과 = require("./경제학과");

const script = {
  url: "https://politics.chungbuk.ac.kr/board/department_notice",
  site_id: boardTree.전공.사회과학대학.정치외교학과.공지사항.id,
  site: "정치외교학과",
  category: "학부공지",
};

module.exports = { ...경제학과, ...script };
