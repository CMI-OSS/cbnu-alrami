import { boardTree } from "@shared/board-tree/board-tree.generated";

import 의학과 from "./의학과";

const script = {
  site_id: boardTree.전공.의과대학.의예과.공지사항.id,
  site: "의예과",
  category: "공지사항",
};

export default { ...의학과, ...script };
