import { boardTree } from "@shared/board-tree/board-tree.generated";

import 경영정보학과 from "./경영정보학과";

const script = {
  url: "https://biz.chungbuk.ac.kr/?pg_idx=7",
  site_id: boardTree.전공.경영대학.경영학부.대학공지.id,
  site: "경영학부",
  category: "대학공지",
};

export default { ...경영정보학과, ...script };
