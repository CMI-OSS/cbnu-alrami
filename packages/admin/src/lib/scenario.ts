import { ScenarioType } from "@shared/types";

export const getScenarioGroups = (scenarios: ScenarioType[]) => {
  const groupSet = new Set<string>();
  scenarios.forEach((scenario) => {
    if (scenario.group) {
      groupSet.add(scenario.group);
    }
  });
  return Array.from(groupSet.values());
};
