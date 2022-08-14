const { boardTree } = require("../../../../../../shared/src/board-tree/board-tree.generated");
const 경제학과 = require("./경제학과");

const script = {
  url: "https://sociology.chungbuk.ac.kr/board/department_notice",
  site_id: boardTree.전공.사회과학대학.사회학과.공지사항.id,
  site: "사회학과",
  category: "학부공지",
};

module.exports = { ...경제학과, ...script };
