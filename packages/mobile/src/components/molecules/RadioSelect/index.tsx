import { memo } from "react";

import classnames from "classnames";
import { StyleProps } from "src/type/props";

import $ from "./style.module.scss";

type Props<T extends string> = {
  label: T;
  index?: number;
  isChecked?: boolean;
  handleChange: (label: T) => void;
} & StyleProps;

function RadioSelect<T extends string>({
  className,
  label,
  index,
  isChecked,
  handleChange,
  style,
}: Props<T>) {
  return (
    <div className={classnames($["radio-box"], className)} style={style}>
      <label htmlFor={`radio_${index}`} className={$["radio-label"]}>
        {label}
      </label>

      <span className={classnames($.radio, { [$.checked]: isChecked })}>
        <input
          id={`radio_${index}`}
          type="radio"
          checked={isChecked}
          value={label}
          className={classnames($["radio-input"], { [$.checked]: isChecked })}
          onChange={() => {
            if (typeof label === "string") handleChange(label);
          }}
        />
      </span>
    </div>
  );
}

const typedMemo: <T>(c: T) => T = memo;
export default typedMemo(RadioSelect);
