import { boardTree } from "@shared/board-tree/board-tree.generated";

import 국어국문학과 from "./국어국문학과";

const script = {
  url: "https://humanum.chungbuk.ac.kr/german/selectBbsNttList.do?bbsNo=149&key=506",
  site_id: boardTree.전공.인문대학.독일언어문화학과.공지사항.id,
  site: "독일언어문화학과",
  category: "공지사항",
};

export default { ...국어국문학과, ...script };
