/* eslint-disable react/jsx-props-no-spreading */
import { ChangeEventHandler } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { MdCancel } from "react-icons/md";

import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";

import $ from "./style.module.scss";
import schema from "./yup";

type Inputs = {
  id: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  authority: string;
  boards: string[];
};

const BOARDS = [
  "심리학과 학생회 공지",
  "소프트웨어학과 학생회 공지",
  "경영대학 학생회 공지",
  "총학생회 공지",
  "CMI 공지",
];

const AUTHORITIES = [ "super", "council", "scraper", "guest" ];

export default function AdminMaker() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: { authority: "super", boards: [] },
  });

  const addNewAdmin = (adminData: Inputs) => {
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(adminData));

    // TODO: 어드민 생성 API 연동
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    addNewAdmin(data);
    reset();
  };

  const handleBoardSelectChange: ChangeEventHandler<HTMLSelectElement> = ({
    target: { value },
  }) => {
    if (value === "선택") return;

    const currentBoards = watch("boards");

    if (currentBoards.includes(value)) return;

    setValue("boards", [ ...currentBoards, value ]);
  };

  const handleDeleteBoard = (target: string) => {
    const currentBoards = watch("boards");
    setValue(
      "boards",
      currentBoards.filter((board) => board !== target),
    );
  };

  return (
    <div className={$.container}>
      <header>
        <h1 className={$.title}>관리자 추가 페이지</h1>
      </header>
      <main className={$.main}>
        <section>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="id-input" className={$.label}>
              아이디
              <input
                type="text"
                id="id-input"
                className={$.input}
                {...register("id")}
              />
            </label>
            <span className={$["error-message"]}>{errors.id?.message}</span>
            <label htmlFor="password-input" className={$.label}>
              비밀번호
              <input
                type="password"
                id="password-input"
                className={$.input}
                {...register("password")}
              />
            </label>
            <span className={$["error-message"]}>
              {errors.password?.message}
            </span>
            <label htmlFor="password-confirm-input" className={$.label}>
              비밀번호 확인
              <input
                type="password"
                id="password-confirm-input"
                className={$.input}
                {...register("passwordConfirm")}
              />
            </label>
            <span className={$["error-message"]}>
              {errors.passwordConfirm?.message}
            </span>
            <label htmlFor="nickname" className={$.label}>
              닉네임
              <input
                type="text"
                id="nickname"
                className={$.input}
                {...register("nickname")}
              />
            </label>
            <span className={$["error-message"]}>
              {errors.nickname?.message}
            </span>
            <label htmlFor="authority-selector" className={$.label}>
              권한
              <select
                className={classNames(
                  $.select,
                  watch("authority") === "super" && $["yellow-option"],
                )}
                id="authority-selector"
                {...register("authority")}
              >
                {AUTHORITIES.map((authority) => (
                  <option key={authority} value={authority}>
                    {authority}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="board-selector" className={$.label}>
              관리 보드 추가
              <select
                className={$.select}
                id="board-selector"
                value="선택"
                onChange={handleBoardSelectChange}
              >
                {[ "선택", ...BOARDS ].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              className={$["submit-button"]}
              aria-label="관리자 만들기"
            >
              관리자 생성
            </button>
          </form>
        </section>
        <section className={$["side-section"]}>
          <h2 className={$["boardlist-title"]}>관리 보드 리스트</h2>
          <ul>
            {watch("boards")?.map((board) => (
              <li key={board} className={$["board-item"]}>
                <span>{board}</span>
                <button
                  type="button"
                  aria-label="이 보드 관리 권한 삭제"
                  onClick={() => handleDeleteBoard(board)}
                  className={$["delete-board-button"]}
                >
                  <MdCancel />
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
