/* eslint-disable react/require-default-props */
import type { DefaultProps } from "src/type/props";

import $ from "./style.module.scss";

type Props = {
  height: number;
  background?: string;
} & DefaultProps;

function BorderBox({ className, height, background, style, children }: Props) {
  return (
    <div className={$["border-box"]} style={{ height, background, ...style }}>
      {children}
    </div>
  );
}

export default BorderBox;
