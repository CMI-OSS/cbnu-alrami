import { boardTree } from "@shared/board-tree/board-tree.generated";

import 소비자학과 from "./소비자학과";

const script = {
  url: "https://housing.cbnu.ac.kr/main/sub.html?pageCode=27",
  site_id: boardTree.전공.생활과학대학.주거환경학과.공지사항.id,
  site: "주거환경학과",
  category: "학과공지사항",
};

export default { ...소비자학과, ...script };
