const { boardTree } = require("../../../../../../shared/src/board-tree/board-tree.generated");
const 전기공학부 = require("./전기공학부");

const script = {
  url: "http://inform.chungbuk.ac.kr/bbs/bbs.php?db=notice",
  site_id: boardTree.전공.전자정보대학.정보통신공학부.공지사항.id,
  site: "정보통신공학부",
  category: "공지사항",
  noticeListSelector: `#content1 > div.section.clear > table:nth-child(6) > tbody > tr`,
};

module.exports = { ...전기공학부, ...script };
