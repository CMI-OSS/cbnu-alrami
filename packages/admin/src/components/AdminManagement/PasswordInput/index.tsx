/* eslint-disable react/jsx-props-no-spreading */
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import classNames from "classnames";

import $ from "./style.module.scss";

type Props = {
  id: string;
  className: string;
  errorMessage: string | undefined;
  label: string;
  register: () => UseFormRegisterReturn;
};

export default function PasswordInput({
  id,
  className,
  errorMessage,
  label,
  register,
}: Props) {
  const [ toggleEncrypted, setToggleEncrypted ] = useState(true);

  return (
    <>
      <label htmlFor={id} className={classNames($.label, className)}>
        <span className={errorMessage ? $["error-message"] : ""}>
          {errorMessage || label}
        </span>
        <div className={$["password-container"]}>
          <input
            type={toggleEncrypted ? "password" : "text"}
            id={id}
            className={$.input}
            {...register()}
          />
          <button
            className={$["encrypt-button"]}
            type="button"
            aria-label={`비밀번호 ${toggleEncrypted ? "보기" : "숨기기"}`}
            onClick={() => {
              return setToggleEncrypted((pre) => {
                return !pre;
              });
            }}
          >
            {toggleEncrypted ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>
      </label>
    </>
  );
}
