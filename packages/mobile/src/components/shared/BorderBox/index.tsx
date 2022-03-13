import type { DefaultProps } from "src/type/props";
import $ from "./style.module.scss";

type Props = {
  width: number;
  height: number;
} & DefaultProps;

function BorderBox({ width, height, style, children }: Props) {
  return (
    <div className={$["border-box"]} style={{ width, height, ...style }}>
      {children}
    </div>
  );
}

export default BorderBox;
