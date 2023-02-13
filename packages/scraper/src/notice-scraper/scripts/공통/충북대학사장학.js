import { boardTree } from "@shared/board-tree/board-tree.generated";

import 충북대공지사항 from "./충북대공지사항";

const script = {
  url: "https://www.chungbuk.ac.kr/site/www/boardList.do?boardSeq=113&key=699",
  site_id: boardTree.공통.충북대학교.학사장학.id,
  site: "충북대학교",
  category: "학사장학",
};

export default { ...충북대공지사항, ...script };
