import type { StyleProps } from "src/type/props";
import $ from "./style.module.scss";

function Line({ style }: StyleProps) {
  return <div className={$.line} style={style} />;
}

export default Line;
