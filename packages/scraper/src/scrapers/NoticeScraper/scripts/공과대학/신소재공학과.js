import { boardTree } from "@shared/board-tree/board-tree.generated";

import 건축공학과 from "./건축공학과";

const script = {
  url: "http://material.cbnu.ac.kr/index.php?mid=material_sub04",
  site_id: boardTree.전공.공과대학.신소재공학과.공지사항.id,
  site: "신소재공학과",
  category: "공지사항",
  noticeListSelector: "#bd_550_0 > div.bd_lst_wrp > table > tbody > tr",
};

export default { ...건축공학과, ...script };
