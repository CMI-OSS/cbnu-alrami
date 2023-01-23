const { boardTree } = require("../../../../../../shared/src/board-tree/board-tree.generated");
const 물리학과 = require("./물리학과");

const script = {
  url: "http://geology.chungbuk.ac.kr/?pg_idx=145",
  site_id: boardTree.전공.자연과학대학.지구환경과학과.공지사항.id,
  site: "지구환경과학과",
  category: "공지사항",
};

module.exports = { ...물리학과, ...script };
