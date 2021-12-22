import { ScenarioType } from "@shared/types";
import Card from "../ScenarioCard";
import getStyle from "./style";

type Props = {
  scenarios: ScenarioType[];
};

function ScenarioList({ scenarios }: Props) {
  const style = getStyle();

  return (
    <div className={style.scenarioList}>
      {scenarios.map((scenario) => (
        <Card className={style.card} scenario={scenario} key={scenario.title} />
      ))}
    </div>
  );
}

export default ScenarioList;
