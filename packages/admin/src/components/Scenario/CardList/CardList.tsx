import { Status } from "@admin/utils/statusContext";
import { ScenarioConfig } from "@shared/types";
import Card from "../ScenarioCard";

type Props = {
  scenario: ScenarioConfig[];
  status: Status;
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
            if (status === Status.All) return true;
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
