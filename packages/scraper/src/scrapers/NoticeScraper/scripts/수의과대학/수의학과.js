import { boardTree } from "@shared/board-tree/board-tree.generated";

import 수의예과 from "./수의예과";

const script = {
  site_id: boardTree.전공.수의과대학.수의학과.공지사항.id,
  site: "수의학과",
  category: "공지사항",
};

export default { ...수의예과, ...script };
