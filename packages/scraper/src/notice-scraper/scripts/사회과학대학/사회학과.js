import { boardTree } from "@shared/board-tree/board-tree.generated";

import 경제학과 from "./경제학과";

const script = {
  url: "https://sociology.chungbuk.ac.kr/board/department_notice",
  site_id: boardTree.전공.사회과학대학.사회학과.공지사항.id,
  site: "사회학과",
  category: "학부공지",
};

export default { ...경제학과, ...script };
