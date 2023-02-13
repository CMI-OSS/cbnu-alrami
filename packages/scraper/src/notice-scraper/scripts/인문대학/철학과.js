import { boardTree } from "@shared/board-tree/board-tree.generated";

import 국어국문학과 from "./국어국문학과";

const script = {
  url: "http://humanum.chungbuk.ac.kr/philosophy/selectBbsNttList.do?bbsNo=99&key=366",
  site_id: boardTree.전공.인문대학.철학과.공지사항.id,
  site: "철학과",
  category: "공지사항",
};

export default { ...국어국문학과, ...script };
