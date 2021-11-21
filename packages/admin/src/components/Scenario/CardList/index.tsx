import { MenuContext, MenuConfig } from "@admin/utils/menuContext";
import { noticeScenariosMocks, noticeGroupsMocks } from "@admin/__mocks__";
import { ScenarioConfig } from "@shared/types";
import { useContext } from "react";
import Card from "../Card";
import getStyle from "./style";

export default function ScenarioCardList() {
  const { status } = useContext(MenuContext);
  const style = getStyle();

  const filterScenario = (scenarios: ScenarioConfig[], group: string) => {
    const scenarioGroup = scenarios.filter(
      (scenario) => scenario.group === group,
    );
    const viewScenario = scenarioGroup.filter((scenario) => {
      const isAll = status === MenuConfig.all;
      const isSameStatus = scenario.status === status;
      return isAll || isSameStatus;
    });
    return viewScenario;
  };

  return (
    <>
      {noticeGroupsMocks.map((group) => {
        const viewScenario = filterScenario(noticeScenariosMocks, group);
        return (
          <div className={style.groupContainer} key={group}>
            <h2 className={style.groupTitle}>{group}</h2>
            <div className={style.scenarioCardList}>
              {viewScenario.map((scenario) => (
                <Card
                  className={style.card}
                  scenario={scenario}
                  key={scenario.title}
                />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}
