import { boardTree } from "@shared/board-tree/board-tree.generated";

import 교육학과 from "./교육학과";

const script = {
  url: "http://edu.chungbuk.ac.kr/earth/selectBbsNttList.do?key=423&bbsNo=47",
  site_id: boardTree.전공.사범대학.지구과학교육과.공지사항.id,
  site: "지구과학교육과",
  category: "공지사항",
};

export default { ...교육학과, ...script };
