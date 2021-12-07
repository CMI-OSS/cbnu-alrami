import { StatusType } from "@admin/store/statusType";
import { ScenarioConfig } from "@shared/types";
import Card from "../ScenarioCard";

type Props = {
  scenario: ScenarioConfig[];
  status: StatusType;
  style: {
    groupContainer: string;
    scenarioCardList: string;
    card: string;
    groupTitle: string;
  };
};

function CardList({ style, scenario, status }: Props) {
  return (
    <div className={style.groupContainer}>
      <div className={style.scenarioCardList}>
        {scenario
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
}

export default CardList;
