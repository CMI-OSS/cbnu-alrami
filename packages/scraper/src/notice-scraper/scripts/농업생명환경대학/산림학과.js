import { boardTree } from "@shared/board-tree/board-tree.generated";

import 농업경제학과 from "./농업경제학과";

const script = {
  url: "http://forestscience.cbnu.ac.kr/index.html?pg_idx=27",
  site_id: boardTree.전공.농업생명환경대학.산림학과.공지사항.id,
  site: "산림학과",
  category: "공지사항",
};

export default { ...농업경제학과, ...script };
