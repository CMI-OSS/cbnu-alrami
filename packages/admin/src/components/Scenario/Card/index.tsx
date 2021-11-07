import { Element } from "@shared/types";
import { cx } from "@emotion/css";
import getStyle from "./style";

interface ScenarioCardProps {
  scenario: {
    id: number;
    title: string;
    subTitle: string;
    status: string;
    tags: Array<string>;
  };
}

export default function ScenarioCard({
  className,
  scenario,
}: ScenarioCardProps & Element) {
  const { title, subTitle, status, tags } = scenario;
  const style = getStyle();

  return (
    <div className={cx(style.scenarioCard, className)}>
      <div className={style.title}>{title}</div>
      <div>{subTitle}</div>
      <div>{status}</div>
      {tags.map((tag) => (
        <span className={style.tag}>{tag}</span>
      ))}
    </div>
  );
}
