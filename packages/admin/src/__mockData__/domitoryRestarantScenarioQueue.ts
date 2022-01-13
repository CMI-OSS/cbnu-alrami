import { ScenarioQueueType, ExcutionLogType } from "src/types";

const queue: ScenarioQueueType[] = [
  {
    id: 1,
    title: "개성재",
    turn: "prev",
  },
  {
    id: 2,
    title: "양진재",
    turn: "current",
  },
  {
    id: 3,
    title: "양성재",
    turn: "next",
  },
];

const log: ExcutionLogType = {
  scraperState: "pause",
  scenarioState: "warning",
  scenarioResult: "fail",
  commands: [
    "GITHUB_TOKEN Permissions",
    "Secret source: Actions",
    "Prepare workflow directory",
    "Prepare all required actions",
    "Download action repository 'actions/checkout@v12' (SHA:ec3a7ce1137a93b817d10a272cb61118579)",
  ],
};

export default { queue, log };
