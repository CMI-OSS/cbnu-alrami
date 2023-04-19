import { boardTree } from "@shared/board-tree/board-tree.generated";

import 사회교육과 from "./사회교육과";

const script = {
  url: "http://edu.chungbuk.ac.kr/bio/selectBbsNttList.do?key=399&bbsNo=2",
  site_id: boardTree.전공.사범대학.생물교육과.공지사항.id,
  site: "생물교육과",
  category: "공지사항",
};

export default { ...사회교육과, ...script };
