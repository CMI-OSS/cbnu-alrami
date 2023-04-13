import { boardTree } from "@shared/board-tree/board-tree.generated";

import 교육학과 from "./교육학과";

const script = {
  url: "https://edu.chungbuk.ac.kr/physicaledu/selectBbsNttList.do?key=479&bbsNo=96",
  site_id: boardTree.전공.사범대학.체육교육과.공지사항.id,
  site: "체육교육과",
  category: "공지사항",
};

export default { ...교육학과, ...script };
