import { Element, ScenarioConfig } from "@shared/types";
import { StatusType } from "src/store/statusType";
import { cx } from "@emotion/css";
import { useEffect, useState } from "react";
import getStyle, { Colors } from "./style";

type Props = {
  scenario: ScenarioConfig;
};

export default function ScenarioCard({ className, scenario }: Props & Element) {
  const { title, subTitle, tags, status } = scenario;
  const [ color, setColor ] = useState(Colors.Green);

  const style = getStyle({ statusColor: color });

  useEffect(() => {
    if (status === StatusType.Clean) {
      setColor(Colors.Green);
      return;
    }
    if (status === StatusType.Warning) {
      setColor(Colors.Yellow);
      return;
    }
    if (status === StatusType.Error) {
      setColor(Colors.Red);
      return;
    }
    if (status === StatusType.Excluded) {
      setColor(Colors.Gray);
    }
  }, [ status ]);

  return (
    <div className={cx(style.scenarioCard, className)}>
      <h2 className={style.title}>{title}</h2>
      <h3>{subTitle}</h3>
      {tags.map((tagText) => (
        <span className={style.tag} key={tagText}>{`# ${tagText}`}</span>
      ))}
      <div className={style.statusContainer}>
        <span className={style.statusText}>{status}</span>
        <div className={style.color}></div>
      </div>
    </div>
  );
}
