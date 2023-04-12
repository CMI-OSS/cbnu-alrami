import { boardTree } from "@shared/board-tree/board-tree.generated";

import 소비자학과 from "./소비자학과";

const script = {
  url: "https://childwelfare.cbnu.ac.kr/main/sub.html?pageCode=26",
  site_id: boardTree.전공.생활과학대학.아동복지학과.공지사항.id,
  site: "아동복지학과",
  category: "공지사항",
};

export default { ...소비자학과, ...script };
