import { boardTree } from "@shared/board-tree/board-tree.generated";

const 소비자학과 = require("./소비자학과");

const script = {
  url: "https://fashion.cbnu.ac.kr/main/sub.html?pageCode=42",
  site_id: boardTree.전공.생활과학대학.의류학과.공지사항.id,
  site: "의류학과",
  category: "학과공지사항",
};

module.exports = { ...소비자학과, ...script };
