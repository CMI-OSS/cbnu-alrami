import { ScenarioQueueType } from "src/types";

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

export default { queue };
