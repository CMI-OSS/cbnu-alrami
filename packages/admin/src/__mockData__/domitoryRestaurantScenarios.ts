import { ScenarioType } from "@shared/types";

const scenarios: ScenarioType[] = [
  {
    id: 1,
    title: "개성재",
    tags: [ "테스트 태그" ],
    state: "clean",
  },
  {
    id: 2,
    title: "양진재",
    tags: [ "테스트 태그" ],
    state: "warning",
  },
  {
    id: 3,
    title: "양성재",
    tags: [ "테스트 태그" ],
    state: "error",
  },
];

export default scenarios;
