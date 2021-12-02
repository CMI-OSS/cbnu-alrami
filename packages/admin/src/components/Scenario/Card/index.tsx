import { Element, ScenarioConfig } from "@shared/types";
import { StatusConfig } from "@admin/utils/statusContext";
import { cx } from "@emotion/css";
import getStyle from "./style";

type Props = {
  scenario: ScenarioConfig;
};

export default function ScenarioCard({ className, scenario }: Props & Element) {
  const { title, subTitle, status, tags } = scenario;
  const { running, waiting } = StatusConfig;
  const style = getStyle();
  let statusColor = "";

  switch (status) {
    case running:
      statusColor = style.green;
      break;
    case waiting:
      statusColor = style.yellow;
      break;
    default:
      statusColor = style.red;
  }

  return (
    <div className={cx(style.scenarioCard, className)}>
      <h2 className={style.title}>{title}</h2>
      <h3>{subTitle}</h3>
      {tags.map((tagText) => (
        <span className={style.tag} key={tagText}>{`# ${tagText}`}</span>
      ))}
      <div className={style.statusContainer}>
        <span className={style.statusText}>{status}</span>
        <div className={statusColor}></div>
      </div>
    </div>
  );
}
