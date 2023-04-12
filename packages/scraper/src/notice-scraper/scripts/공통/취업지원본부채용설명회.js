import { boardTree } from "@shared/board-tree/board-tree.generated";

import 취업지원본부공지사항 from "./취업지원본부공지사항";

const script = {
  url: "https://hrd.cbnu.ac.kr/board/board_list.asp?groupno=1&listno=2",
  site_id: boardTree.공통.취업지원본부.채용설명회.id,
  site: "취업지원본부",
  category: "채용설명회",
  noticeContentsSelector: "#content_main > table",
};

export default { ...취업지원본부공지사항, ...script };
