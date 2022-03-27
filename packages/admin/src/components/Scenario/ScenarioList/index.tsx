import { ScenarioType } from "@shared/types";
import Card from "../ScenarioCard";
import $ from "./style.module.scss";

type Props = {
  scenarios: ScenarioType[];
};

function ScenarioList({ scenarios }: Props) {
  return (
    <div className={$.container}>
      {scenarios.map((scenario) => (
        <Card className={$.card} scenario={scenario} key={scenario.title} />
      ))}
    </div>
  );
}

export default ScenarioList;
