import { Element, ScenarioType, ScenarioStateType } from "@shared/types";
import classnames from "classnames";

import $ from "./style.module.scss";

type Props = {
  scenario: ScenarioType;
};

type ColorType = "green" | "yellow" | "red" | "gray";

export default function ScenarioCard({ className, scenario }: Props & Element) {
  const { title, subTitle, tags, state } = scenario;

  const colorMap = new Map<ScenarioStateType, ColorType>([
    [ "clean", "green" ],
    [ "warning", "yellow" ],
    [ "error", "red" ],
    [ "excluded", "gray" ],
  ]);

  const stateLabelMap = new Map<ScenarioStateType, string>([
    [ "clean", "원활" ],
    [ "warning", "경고" ],
    [ "error", "장애" ],
    [ "excluded", "배제" ],
  ]);

  return (
    <div className={classnames($.card, className)}>
      <h2>{title}</h2>
      <h3>{subTitle}</h3>
      {tags.map((tagText) => {
        return <span className={$.tag} key={tagText}>{`# ${tagText}`}</span>;
      })}
      <div className={$["status-container"]}>
        <span>{stateLabelMap.get(state)}</span>
        <div className={$[`${colorMap.get(state)}`]}></div>
      </div>
    </div>
  );
}
