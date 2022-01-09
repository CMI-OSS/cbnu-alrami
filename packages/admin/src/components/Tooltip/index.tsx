import { cx } from "@emotion/css";
import getStyle from "./style";

interface Props {
  content: string;
  parent: string;
}

export default function ScraperManager({ content, parent }: Props) {
  const style = getStyle(parent);
  return (
    <span className={cx(style.tooltip, style.parentHover)}>{content}</span>
  );
}
