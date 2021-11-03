import { noticeScenariosMocks } from "@admin/__mocks__";
import Card from "../Card";
import getStyle from "./style";

export default function ScenarioCardList() {
  return (
    <div className={getStyle()}>
      {noticeScenariosMocks.map((scenario) => (
        <Card className="card" scenario={scenario} />
      ))}
    </div>
  );
}
