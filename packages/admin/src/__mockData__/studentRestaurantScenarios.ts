import { ScenarioType } from "@shared/types";

const scenarios: ScenarioType[] = [
  {
    id: 1,
    title: "한빛식당",
    tags: [ "테스트 태그" ],
    state: "clean",
  },
  {
    id: 2,
    title: "별빛식당",
    tags: [ "테스트 태그" ],
    state: "warning",
  },
  {
    id: 3,
    title: "은화수식당",
    tags: [ "테스트 태그" ],
    state: "error",
  },
];

export default scenarios;
