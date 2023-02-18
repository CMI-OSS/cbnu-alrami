import { boardTree } from "@shared/board-tree/board-tree.generated";

import 건축공학과 from "./건축공학과";

const script = {
  url: "https://urban.cbnu.ac.kr/urban_sub05",
  site_id: boardTree.전공.공과대학.도시공학과.공지사항.id,
  site: "도시공학과",
  category: "공지사항",
};

export default { ...건축공학과, ...script };
