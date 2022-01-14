import { ScenarioQueueType, ExcutionLogType } from "src/types";

const queue: ScenarioQueueType[] = [
  {
    id: 1,
    title: "한빛식당",
    turn: "prev",
  },
  {
    id: 2,
    title: "별빛식당",
    turn: "current",
  },
  {
    id: 3,
    title: "은화수식당",
    turn: "next",
  },
];

const log: ExcutionLogType = {
  scraperState: "error",
  scenarioState: "error",
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
