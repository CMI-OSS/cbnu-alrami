import { boardTree } from "@shared/board-tree/board-tree.generated";

import 국어국문학과 from "./국어국문학과";

const script = {
  url: "http://humanum.chungbuk.ac.kr/chinese/selectBbsNttList.do?bbsNo=73&key=293",
  site_id: boardTree.전공.인문대학.중어중문학과.공지사항.id,
  site: "중어중문학과",
  category: "공지사항",
};

export default { ...국어국문학과, ...script };
