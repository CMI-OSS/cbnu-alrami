import { ScenarioQueueType, ExcutionLogType } from "src/types";

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
  scraperState: "running",
  scenarioState: "clean",
  scenarioResult: "success",
  commands: [
    "GITHUB_TOKEN Permissions",
    "Secret source: Actions",
    "Prepare workflow directory",
    "Prepare all required actions",
    "Download action repository 'actions/checkout@v12' (SHA:ec3a7ce1137a93b817d10a272cb61118579)",
  ],
};

export default { queue, log };
