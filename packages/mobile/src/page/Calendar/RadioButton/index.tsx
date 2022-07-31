import { ChangeEventHandler } from "react";

import classNames from "classnames";

import $ from "./style.module.scss";

type Props = {
  labelText: string;
  value: string;
  isChecked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

function RadioButton({ labelText, value, isChecked, onChange }: Props) {
  return (
    <label
      className={classNames({ [$["checked-label"]]: isChecked }, $.label)}
      htmlFor={value}
    >
      <input
        className={$["radio-input"]}
        type="radio"
        id={value}
        checked={isChecked}
        {...{ value, onChange }}
      />
      {labelText}
    </label>
  );
}

export default RadioButton;
