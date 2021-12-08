import { StatusType } from "src/store/statusType";
import { noticeGroupsMockData } from "src/__mockData__";
import { ScenarioConfig } from "@shared/types";
import Card from "../ScenarioCard";

type Props = {
  group: string;
  scenario: ScenarioConfig[];
  status: StatusType;
  style: {
    groupContainer: string;
    scenarioCardList: string;
    card: string;
    groupTitle: string;
  };
};

export default function NoticeCardList({
  group,
  scenario,
  status,
  style,
}: Props) {
  const filterScenario = (scenarios: ScenarioConfig[], group: string) => {
    const scenarioGroup = scenarios.filter(
      (scenario) => scenario.group === group,
    );
    return scenarioGroup;
  };

  return (
    <>
      {noticeGroupsMockData
        .filter((item) => {
          if (group === "모두보기") return true;
          return item === group;
        })
        .map((group) => {
          const viewScenario = filterScenario(scenario, group);
          return (
            <div className={style.groupContainer} key={group}>
              <h2 className={style.groupTitle}>{group}</h2>
              <div className={style.scenarioCardList}>
                {viewScenario
                  .filter((scenario) => {
                    if (status === StatusType.All) return true;
                    return scenario.status === status;
                  })
                  .map((scenario) => (
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
