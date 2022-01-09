import { ScenarioQueueType, ExcutionLogType } from "@shared/types";

const queue: ScenarioQueueType[] = [
  {
    id: 1,
    title: "전기공학부",
    turn: "prev",
  },
  {
    id: 2,
    title: "소프트웨어학과",
    turn: "current",
  },
  {
    id: 3,
    title: "컴퓨터공학과",
    turn: "next",
  },
];

const log: ExcutionLogType = {
  scraper: "공지사항 목록",
  result: "스크래핑 실패 및 일시정지",
  commands: [
    "GITHUB_TOKEN Permissions",
    "Secret source: Actions",
    "Prepare workflow directory",
    "Prepare all required actions",
    "Getting action download info",
    "Download action repository 'actions/checkout@v12' (SHA:ec3a7ce1137a93b817d10a272cb61118579)",
  ],
};

export default { queue, log };
