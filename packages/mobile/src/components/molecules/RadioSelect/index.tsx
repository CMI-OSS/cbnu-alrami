import { memo } from "react";

import classnames from "classnames";
import { StyleProps } from "src/type/props";

import $ from "./style.module.scss";

type Props = {
  label: string;
  isChecked?: boolean;
  handleChange: (label: string) => void;
} & StyleProps;

function RadioSelect({ className, label, isChecked, handleChange, style }: Props) {
  return (
    <div className={classnames($["radio-box"], className)} style={style}>
      <label htmlFor="radio" className={$["radio-label"]}>
        {label}
      </label>

      <span className={classnames($.radio, { [$.checked]: isChecked })}>
        <input
          id="radio"
          type="radio"
          checked={isChecked}
          value={label}
          className={classnames($["radio-input"], { [$.checked]: isChecked })}
          onChange={(e) => handleChange(e.target.value)}
        />
      </span>
    </div>
  );
}

export default memo(RadioSelect);
