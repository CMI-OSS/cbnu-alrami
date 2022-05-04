/* eslint-disable react/jsx-props-no-spreading */
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import classNames from "classnames";

import $ from "./style.module.scss";

type Props = {
  id: string;
  className: string;
  errorMessage: string;
  label: string;
  register: () => void;
};

export default function PasswordInput({
  id,
  className,
  errorMessage,
  label,
  register,
}: Props) {
  const [ isEncrypted, setIsEncrypted ] = useState(true);

  return (
    <>
      <label htmlFor={id} className={classNames($.label, className)}>
        <span className={errorMessage ? $["error-message"] : ""}>
          {errorMessage || label}
        </span>
        <div className={$["password-container"]}>
          <input
            type={isEncrypted ? "password" : "text"}
            id={id}
            className={$.input}
            {...register()}
          />
          <button
            className={$["encrypt-button"]}
            type="button"
            aria-label={`비밀번호 ${isEncrypted ? "보기" : "숨기기"}`}
            onClick={() => setIsEncrypted((pre) => !pre)}
          >
            {isEncrypted ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>
      </label>
    </>
  );
}
