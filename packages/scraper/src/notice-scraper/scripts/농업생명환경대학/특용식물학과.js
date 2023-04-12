import { boardTree } from "@shared/board-tree/board-tree.generated";

import 농업경제학과 from "./농업경제학과";

const script = {
  url: "https://tobagin.cbnu.ac.kr/index.html?pg_idx=34",
  site_id: boardTree.전공.농업생명환경대학.특용식물학과.공지사항.id,
  site: "특용식물학과",
  category: "공지사항",
  noticeContentsSelector: ".rd_body",
};

export default { ...농업경제학과, ...script };
