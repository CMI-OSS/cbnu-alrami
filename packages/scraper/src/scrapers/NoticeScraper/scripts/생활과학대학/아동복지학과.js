const { boardTree } = require("../../../../../../shared/src/board-tree/board-tree.generated");
const 소비자학과 = require("./소비자학과");

const script = {
  url: "http://childwelfare.cbnu.ac.kr/main/sub.html?pageCode=26",
  site_id: boardTree.전공.생활과학대학.아동복지학과.공지사항.id,
  site: "아동복지학과",
  category: "공지사항",
};

module.exports = { ...소비자학과, ...script };
