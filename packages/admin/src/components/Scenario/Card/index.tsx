import { Element, scenarioConfig } from "@shared/types";
import { sidebarMenus } from "@admin/utils/menuContext";
import { cx } from "@emotion/css";
import getStyle from "./style";

interface ScenarioCardConfig {
  scenario: scenarioConfig;
}

export default function ScenarioCard({
  className,
  scenario,
}: ScenarioCardConfig & Element) {
  const { titleText, subTitle, status, tags } = scenario;
  const {
    scenarioCard,
    title,
    tag,
    statusText,
    statusContainer,
    red,
    yellow,
    green,
  } = getStyle();

  let statusColor = "";

  // TODO: ESLint 규칙에 추가하기
  // eslint-disable-next-line default-case
  switch (status) {
    case sidebarMenus[1]:
      statusColor = green;
      break;
    case sidebarMenus[2]:
      statusColor = yellow;
      break;
    case sidebarMenus[3]:
      statusColor = red;
      break;
  }

  return (
    <div className={cx(scenarioCard, className)}>
      <h2 className={title}>{titleText}</h2>
      <h3>{subTitle}</h3>
      {tags.map((tagText) => (
        <span className={tag} key={tagText}>{`# ${tagText}`}</span>
      ))}
      <div className={statusContainer}>
        <span className={statusText}>{status}</span>
        <div className={statusColor}></div>
      </div>
    </div>
  );
}
