import { StatusConfig } from "@admin/utils/statusContext";
import { ScenarioConfig } from "@shared/types";
import Card from "../Card";

type Props = {
  data: ScenarioConfig[];
  status: StatusConfig;
  style: {
    groupContainer: string;
    scenarioCardList: string;
    card: string;
    groupTitle: string;
  };
};

function CardList({ style, data, status }: Props) {
  return (
    <div className={style.groupContainer}>
      <div className={style.scenarioCardList}>
        {data
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
}

export default CardList;
