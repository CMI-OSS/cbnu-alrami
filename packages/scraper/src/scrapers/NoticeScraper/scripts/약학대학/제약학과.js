import { boardTree } from "@shared/board-tree/board-tree.generated";

const 약학과 = require("./약학과");

const script = {
  site_id: boardTree.전공.약학대학.제약학과.공지사항.id,
  site: "제약학과",
  category: "공지사항",
};

export default { ...약학과, ...script };
