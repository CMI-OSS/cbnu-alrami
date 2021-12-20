/* eslint-disable react/require-default-props */
import { StatusType } from "src/store/statusType";
import { ScenarioConfig } from "@shared/types";
import getStyle from "./style";
import ScenarioList from "../ScenarioList";

interface Props {
  scenarios: ScenarioConfig[];
  status?: StatusType;
}

function ScenarioGroupList({ scenarios, status = StatusType.All }: Props) {
  const style = getStyle();

  const getGroups = () => {
    const groupSet = new Set<string>();
    scenarios.forEach((scenario) => {
      if (scenario.group) {
        groupSet.add(scenario.group);
      }
    });
    return Array.from(groupSet.keys());
  };

  const getFilteredScenarios = (group?: string) => {
    return scenarios
      .filter((scenario) => {
        if (status === StatusType.All) return true;
        return scenario.status === status;
      })
      .filter((scenario) => {
        if (!group) return true;
        return scenario.group === group;
      });
  };

  if (getGroups().length === 0)
    return <ScenarioList scenarios={getFilteredScenarios()} />;

  return (
    <>
      {getGroups().map((group) => {
        return (
          <div className={style.groupContainer} key={group}>
            <h2 className={style.groupTitle}>{group}</h2>
            <ScenarioList scenarios={getFilteredScenarios(group)} />
          </div>
        );
      })}
    </>
  );
}

export default ScenarioGroupList;
