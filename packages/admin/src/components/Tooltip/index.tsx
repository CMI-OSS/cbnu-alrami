import cx from "classnames";
import $ from "./style.module.scss";

interface Props {
  content: string;
  parent: string;
}

export default function ScraperManager({ content, parent }: Props) {
  return <span className={cx($.tooltip, $.parentHover)}>{content}</span>;
}
