import { DefaultProps } from "src/type/props";
import $ from "./style.module.scss";

type Props = {
  width: number;
  height: number;
} & DefaultProps;
function Radio({ width, height, children, style }: Props) {
  return (
    <div className={$.radio} style={{ width, height, ...style }}>
      <input type="radio" name="radio" />
      <label htmlFor="radio" className={$["radio-label"]}>{children}</label>
    </div>
  );
}

export default Radio;
