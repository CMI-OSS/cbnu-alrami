import { boardTree } from "@shared/board-tree/board-tree.generated";

const 물리학과 = require("./물리학과");

const script = {
  url: "http://biology.chungbuk.ac.kr/?pg_idx=145",
  site_id: boardTree.전공.자연과학대학.생물학과.공지사항.id,
  site: "생물학과",
  category: "공지사항",
};

module.exports = { ...물리학과, ...script };
