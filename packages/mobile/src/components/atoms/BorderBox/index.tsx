import type { DefaultProps } from "src/type/props";

import $ from "./style.module.scss";

type Props = {
  width?: number | string;
  height: number;
  background?: string;
} & DefaultProps;

function BorderBox({
  className,
  width = "100%",
  height,
  background,
  style,
  children,
}: Props) {
  return (
    <div
      className={$["border-box"]}
      style={{ width, height, background, ...style }}
    >
      {children}
    </div>
  );
}

export default BorderBox;
