import { boardTree } from "@shared/board-tree/board-tree.generated";

import 경영정보학과 from "./경영정보학과";

const script = {
  url: "https://ib.chungbuk.ac.kr/master.php?pg_idx=33",
  site_id: boardTree.전공.경영대학.국제경영학과.학부공지.id,
  site: "국제경영학과",
  category: "학부공지",
};

export default { ...경영정보학과, ...script };
