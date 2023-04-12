import { boardTree } from "@shared/board-tree/board-tree.generated";

import 교육학과 from "./교육학과";

const script = {
  url: "https://edu.chungbuk.ac.kr/mathedu/selectBbsNttList.do?key=763&bbsNo=88",
  site_id: boardTree.전공.사범대학.수학교육과.공지사항.id,
  site: "수학교육과",
  category: "공지사항",
};

export default { ...교육학과, ...script };
