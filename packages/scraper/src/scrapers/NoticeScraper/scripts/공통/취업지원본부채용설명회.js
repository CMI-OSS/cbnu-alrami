import { boardTree } from "@shared/board-tree/board-tree.generated";

const 취업지원본부공지사항 = require("./취업지원본부공지사항");

const script = {
  url: "http://hrd.cbnu.ac.kr/board/board_list.asp?groupno=1&listno=2",
  site_id: boardTree.공통.취업지원본부.채용설명회.id,
  site: "취업지원본부",
  category: "채용설명회",
  noticeContentsSelector: "#content_main > table",
};

module.exports = { ...취업지원본부공지사항, ...script };
