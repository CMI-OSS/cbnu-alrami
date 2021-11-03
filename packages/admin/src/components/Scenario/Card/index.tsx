import { Element } from "@shared/types";
import cx from "classnames/bind";
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

  return (
    <div className={cx(getStyle(), className)}>
      <div className="title">{title}</div>
      <div className="sub_title">{subTitle}</div>
      <div className="status">{status}</div>
      {tags.map((tag) => (
        <span className="tag">{tag}</span>
      ))}
    </div>
  );
}
