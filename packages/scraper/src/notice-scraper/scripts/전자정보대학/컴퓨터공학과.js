import { boardTree } from "@shared/board-tree/board-tree.generated";

import 전기공학부 from "./전기공학부";

const script = {
  url: "http://computer.chungbuk.ac.kr/bbs/bbs.php?db=notice",
  site_id: boardTree.전공.전자정보대학.컴퓨터공학과.공지사항.id,
  site: "컴퓨터공학과",
  category: "공지사항",
  noticeListSelector: `#content > table:nth-child(9) > tbody > tr`,
};

export default { ...전기공학부, ...script };
