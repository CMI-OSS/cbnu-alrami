import { boardTree } from "@shared/board-tree/board-tree.generated";

import 소비자학과 from "./소비자학과";

const script = {
  url: "https://fashion.cbnu.ac.kr/main/sub.html?pageCode=42",
  site_id: boardTree.전공.생활과학대학.의류학과.공지사항.id,
  site: "의류학과",
  category: "학과공지사항",
};

export default { ...소비자학과, ...script };
