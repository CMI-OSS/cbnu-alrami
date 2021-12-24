import { Element, ScenarioType, ScenarioStateType } from "@shared/types";
import { cx } from "@emotion/css";
import getStyle, { ColorType } from "./style";

type Props = {
  scenario: ScenarioType;
};

export default function ScenarioCard({ className, scenario }: Props & Element) {
  const { title, subTitle, tags, state } = scenario;

  const colorMap = new Map<ScenarioStateType, ColorType>([
    [ "clean", "green" ],
    [ "warning", "yellow" ],
    [ "error", "red" ],
    [ "excluded", "green" ],
  ]);

  const stateLabelMap = new Map<ScenarioStateType, string>([
    [ "clean", "원활" ],
    [ "warning", "경고" ],
    [ "error", "장애" ],
    [ "excluded", "배제" ],
  ]);

  const style = getStyle({ stateColor: colorMap.get(state) || "green" });

  return (
    <div className={cx(style.scenarioCard, className)}>
      <h2 className={style.title}>{title}</h2>
      <h3>{subTitle}</h3>
      {tags.map((tagText) => (
        <span className={style.tag} key={tagText}>{`# ${tagText}`}</span>
      ))}
      <div className={style.stateContainer}>
        <span className={style.stateText}>{stateLabelMap.get(state)}</span>
        <div className={style.color}></div>
      </div>
    </div>
  );
}
