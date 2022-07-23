import { memo } from "react";

import classnames from "classnames";
import { StyleProps } from "src/type/props";

import $ from "./style.module.scss";

type Props = {
  label: string;
  isChecked?: boolean;
  handleChange: (label: string) => void;
} & StyleProps;

function Radio({ className, label, isChecked, handleChange, style }: Props) {
  return (
    <div className={classnames($["radio-box"], className)} style={style}>
      <label htmlFor="radio" className={$["radio-label"]}>
        {label}
      </label>

      <div className={classnames($.radio, { [$.checked]: isChecked })}>
        <input
          id="radio"
          type="radio"
          checked={isChecked}
          value={label}
          onChange={(e) => handleChange(e.target.value)}
          className={classnames($["radio-input"], { [$.checked]: isChecked })}
        />
      </div>
    </div>
  );
}

export default memo(Radio);
