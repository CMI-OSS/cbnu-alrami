import classnames from "classnames";
import type { DefaultProps } from "src/type/props";

import $ from "./style.module.scss";

type Props = {
  width?: number | string;
  height?: number | string;
  background?: string;
} & DefaultProps;

function BorderBox({
  className,
  width = "100%",
  height = "auto",
  background,
  style,
  children,
}: Props) {
  return (
    <div
      className={classnames($["border-box"], className)}
      style={{ width, height, background, ...style }}
    >
      {children}
    </div>
  );
}

export default BorderBox;
