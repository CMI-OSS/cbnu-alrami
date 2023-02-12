import { boardTree } from "@shared/board-tree/board-tree.generated";

import 교육학과 from "./교육학과";

const script = {
  url: "http://edu.chungbuk.ac.kr/chemedu/selectBbsNttList.do?key=372&bbsNo=72",
  site_id: boardTree.전공.사범대학.화학교육과.공지사항.id,
  site: "화학교육과",
  category: "공지사항",
};

export default { ...교육학과, ...script };
