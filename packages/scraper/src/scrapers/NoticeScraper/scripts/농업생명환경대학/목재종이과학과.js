import { boardTree } from "@shared/board-tree/board-tree.generated";

import 농업경제학과 from "./농업경제학과";

const script = {
  url: "http://wood-paper.chungbuk.ac.kr/index.html?pg_idx=31",
  site_id: boardTree.전공.농업생명환경대학.목재종이학과.공지사항.id,
  site: "목재종이과학과",
  category: "공지사항",
  noticeContentsSelector: ".rd_body",
};

export default { ...농업경제학과, ...script };
