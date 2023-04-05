import 산림학과 from "./scripts/농업생명환경대학/산림학과";
import 지리교육과 from "./scripts/사범대학/지리교육과";
import 약학과 from "./scripts/약학대학/약학과";
import 제약학과 from "./scripts/약학대학/제약학과";

export const excludeSites = [
  {
    script: 산림학과,
    reason: "권한이 필요한 게시판",
  },
  {
    script: 지리교육과,
    reason: "비공개 게시판",
  },
  {
    script: 약학과,
    reason: "게시물에 URL로 직접접근이 불가",
  },
  {
    script: 제약학과,
    reason: "약학과와 동일한 게시판",
  },
];

export const excludeNotices = [
  {
    url: "https://agecon.cbnu.ac.kr/?mod=view&pg_idx=119&pidx=319&page=1",
    reason: "내용이 너무 김",
  },
];
