import { ScenarioQueueType, ExcutionLogType } from "@shared/types";

const queue: ScenarioQueueType[] = [
  {
    id: 1,
    title: "2021년 학사일정",
    turn: "prev",
  },
  {
    id: 2,
    title: "2022년 학사일정",
    turn: "current",
  },
];

const log: ExcutionLogType = {
  scraper: "학사일정 목록",
  result: "스크래핑 성공 및 종료",
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
