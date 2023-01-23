const { boardTree } = require("../../../../../../shared/src/board-tree/board-tree.generated");
const 물리학과 = require("./물리학과");

const script = {
  url: "http://ast.chungbuk.ac.kr/?pg_idx=147",
  site_id: boardTree.전공.자연과학대학.천문우주학과.공지사항.id,
  site: "천문우주학과",
  category: "공지사항",
};

module.exports = { ...물리학과, ...script };
