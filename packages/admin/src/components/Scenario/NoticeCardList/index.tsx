import { StatusConfig } from "@admin/utils/statusContext";
import { noticeGroupsMocks } from "@admin/__mocks__";
import { ScenarioConfig } from "@shared/types";
import Card from "../Card";

type Props = {
  group: string;
  data: ScenarioConfig[];
  status: StatusConfig;
  style: {
    groupContainer: string;
    scenarioCardList: string;
    card: string;
    groupTitle: string;
  };
};

export default function CardListContainer({
  group,
  data,
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
      {noticeGroupsMocks
        .filter((item) => {
          if (group === "모두보기") return true;
          return item === group;
        })
        .map((group) => {
          const viewScenario = filterScenario(data, group);
          return (
            <div className={style.groupContainer} key={group}>
              <h2 className={style.groupTitle}>{group}</h2>
              <div className={style.scenarioCardList}>
                {viewScenario
                  .filter((scenario) => {
                    if (status === StatusConfig.all) return true;
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
