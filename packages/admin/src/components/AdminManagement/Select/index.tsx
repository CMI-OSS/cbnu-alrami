/* eslint-disable react/jsx-props-no-spreading */
import classNames from "classnames";

import $ from "./style.module.scss";

type Props = {
  className: string;
  id: string;
  options: string[];
  label: string;
  register: () => void;
};

export default function Select({
  className,
  id,
  options,
  label,
  register,
}: Props) {
  return (
    <label htmlFor={id} className={classNames($.label, className)}>
      {label}
      <select className={$.select} id={id} {...register()}>
        {options.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </label>
  );
}
