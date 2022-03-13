import type { DefaultProps } from "src/type/props";
import $ from "./style.module.scss";

type Props = {
  height: number;
} & DefaultProps;

function BorderBox({ className, height, style, children }: Props) {
  return (
    <div className={$["border-box"]} style={{ height, ...style }}>
      {children}
    </div>
  );
}

export default BorderBox;
