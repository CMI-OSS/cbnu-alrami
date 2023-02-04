import { boardTree } from "@shared/board-tree/board-tree.generated";

const 충북대공지사항 = require("./충북대공지사항");

const script = {
  url: "https://www.chungbuk.ac.kr/site/www/boardList.do?boardSeq=113&key=699",
  site_id: boardTree.공통.충북대학교.학사장학.id,
  site: "충북대학교",
  category: "학사장학",
};

module.exports = { ...충북대공지사항, ...script };
