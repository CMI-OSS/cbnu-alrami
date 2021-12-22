import { ScenarioType } from "@shared/types";

export const getScnarioGroups = (scenarios: ScenarioType[]) => {
  const groupSet = new Set<string>();
  scenarios.forEach((scenario) => {
    if (scenario.group) {
      groupSet.add(scenario.group);
    }
  });
  return Array.from(groupSet.keys());
};
