import { ScenarioQueueType } from "src/types";

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

export default { queue };
