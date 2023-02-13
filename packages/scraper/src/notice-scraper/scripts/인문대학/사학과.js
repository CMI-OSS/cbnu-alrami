import { boardTree } from "@shared/board-tree/board-tree.generated";

import 국어국문학과 from "./국어국문학과";

const script = {
  url: "http://humanum.chungbuk.ac.kr/cbnuhistory/selectBbsNttList.do?bbsNo=98&key=388",
  site_id: boardTree.전공.인문대학.사학과.공지사항.id,
  site: "사학과",
  category: "공지사항",
};

export default { ...국어국문학과, ...script };
