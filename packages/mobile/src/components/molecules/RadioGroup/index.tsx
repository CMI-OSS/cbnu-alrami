import { DefaultProps } from "src/type/props";

import $ from "./style.module.scss";

function RadioGroup({ children }: DefaultProps) {
  return <div className={$["radio-group"]}>{children}</div>;
}

export default RadioGroup;
