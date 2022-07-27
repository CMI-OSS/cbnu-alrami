import { ChangeEventHandler } from "react";
import { UseFormRegister } from "react-hook-form";

import { AdminJoinFormErrors, AdminJoinFormInputs } from "src/types";

import PasswordInput from "../PasswordInput";
import Select from "../Select";
import TextInput from "../TextInput";
import $ from "./style.module.scss";

type Props = {
  onSubmit: () => void;
  register: UseFormRegister<AdminJoinFormInputs>;
  onBoardSelectChange: ChangeEventHandler<HTMLSelectElement>;
  errors: AdminJoinFormErrors;
};

const BOARDS = [
  "심리학과 학생회 공지",
  "소프트웨어학과 학생회 공지",
  "경영대학 학생회 공지",
  "총학생회 공지",
  "CMI 공지",
];

const AUTHORITIES = [ "super", "council", "scraper", "guest" ];

export default function JoinForm({
  onSubmit: handleSubmit,
  register,
  onBoardSelectChange: handleBoardSelectChange,
  errors,
}: Props) {
  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        id="id-input"
        className={$.input}
        errorMessage={errors.id?.message}
        label="아이디"
        register={() => {
          return register("id");
        }}
      />
      <PasswordInput
        id="password-input"
        className={$.input}
        errorMessage={errors.password?.message}
        label="비밀번호"
        register={() => {
          return register("password");
        }}
      />
      <PasswordInput
        id="password-confirm-input"
        className={$.input}
        errorMessage={errors.passwordConfirm?.message}
        label="비밀번호 확인"
        register={() => {
          return register("passwordConfirm");
        }}
      />
      <TextInput
        id="nickname"
        className={$.input}
        errorMessage={errors.nickname?.message}
        label="닉네임"
        register={() => {
          return register("nickname");
        }}
      />
      <Select
        className={$.select}
        id="authority-select"
        options={AUTHORITIES}
        label="권한"
        register={() => {
          return register("authority");
        }}
      />
      <Select
        className={$.select}
        id="board-select"
        options={[ "선택", ...BOARDS ]}
        label="관리 보드 선택"
        register={() => {
          return { onChange: handleBoardSelectChange };
        }}
      />
      <button
        type="submit"
        className={$["submit-button"]}
        aria-label="관리자 만들기"
      >
        관리자 생성
      </button>
    </form>
  );
}
