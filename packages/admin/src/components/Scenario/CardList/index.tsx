import { noticeScenariosMocks } from "@admin/__mocks__";
import Card from "../Card";
import getStyle from "./style";

export default function ScenarioCardList() {
  const style = getStyle();

  return (
    <div className={style.scenarioCardList}>
      {noticeScenariosMocks.map((scenario) => (
        <Card className={style.card} scenario={scenario} />
      ))}
      <div>asf</div>
    </div>
  );
}
