const { boardTree } = require("../../../../../../shared/src/board-tree/board-tree.generated");
const 경영정보학과 = require("./경영정보학과");

const script = {
  url: "https://mis.chungbuk.ac.kr/master.php?pg_idx=33",
  site_id: boardTree.전공.경영대학.경영정보학과.대학원공지.id,
  site: "경영정보학과",
  category: "대학원공지",
};

module.exports = { ...경영정보학과, ...script };
