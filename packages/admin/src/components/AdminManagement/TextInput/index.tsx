/* eslint-disable react/jsx-props-no-spreading */
import { UseFormRegisterReturn } from "react-hook-form";

import classNames from "classnames";

import $ from "./style.module.scss";

type Props = {
  id: string;
  className: string;
  errorMessage: string | undefined;
  label: string;
  register: () => UseFormRegisterReturn;
};

export default function TextInput({
  id,
  className,
  errorMessage,
  label,
  register,
}: Props) {
  return (
    <>
      <label htmlFor={id} className={classNames($.label, className)}>
        <span className={errorMessage ? $["error-message"] : ""}>
          {errorMessage || label}
        </span>
        <input type="text" id={id} className={$.input} {...register()} />
      </label>
    </>
  );
}
