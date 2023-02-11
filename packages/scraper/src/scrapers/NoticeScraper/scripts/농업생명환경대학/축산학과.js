import { boardTree } from "@shared/board-tree/board-tree.generated";

import 원예학과 from "./원예학과";

const script = {
  url: "https://animalscience.chungbuk.ac.kr/board/board.php?id=as_news",
  site_id: boardTree.전공.농업생명환경대학.축산학과.공지사항.id,
  site: "축산학과",
  category: "공지사항",
};

export default { ...원예학과, ...script };
