import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import classnames from "classnames";
import { useLoginMutation } from "src/api/auth";

import $ from "./style.module.scss";

export default function LoginForm() {
  const [ message, setMessage ] = useState("");
  const [ isFocusId, setFocusId ] = useState(false);
  const [ isFocusPw, setFocusPw ] = useState(false);
  const [ isLock, setLock ] = useState(true);
  const navigate = useNavigate();

  const [ login ] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const id = register("id", { required: true });
  const password = register("password", { required: true });

  useEffect(() => {
    if (errors.id) {
      setMessage("아이디를 입력해주세요.");
      return;
    }
    if (errors.password) {
      setMessage("비밀번호를 입력해주세요.");
      return;
    }
    setMessage("");
  }, [ errors.id, errors.password ]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await login({ loginId: data.id, password: data.password });

    if ("error" in res) {
      alert((res.error as any).data.error.message);
      return;
    }

    localStorage.setItem("x-access-token", res.data.xAccessToken);
    navigate("/");
  };

  return (
    <main className={$.main}>
      <span>CMI 관리자</span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={classnames($["id-box"], {
            [$.focus]: isFocusId,
          })}
        >
          <IoPersonOutline className={$.icon} />
          <input
            className={$.input}
            placeholder="아이디"
            name={id.name}
            onChange={id.onChange}
            onFocus={() => {
              return setFocusId(true);
            }}
            onBlur={() => {
              return setFocusId(false);
            }}
            ref={id.ref}
          />
        </div>
        <div
          className={classnames($["pw-box"], {
            [$.focus]: isFocusPw,
          })}
        >
          <button
            className={$["lock-box"]}
            type="button"
            onClick={() => {
              return setLock(!isLock);
            }}
          >
            {isLock ? (
              <AiOutlineLock className={classnames($.icon, $.lock)} />
            ) : (
              <AiOutlineUnlock className={classnames($.icon, $.unlock)} />
            )}
          </button>
          <input
            type={isLock ? "password" : "text"}
            placeholder="비밀번호"
            name={password.name}
            onChange={password.onChange}
            onFocus={() => {
              return setFocusPw(true);
            }}
            onBlur={() => {
              return setFocusPw(false);
            }}
            ref={password.ref}
          />
        </div>
        <p>{message}</p>
        <input className={$.submit} type="submit" value="로그인" />
      </form>
      <img
        alt="우왕이와 친구들"
        src="https://user-images.githubusercontent.com/62797441/141838255-94117137-98fb-4159-920b-5c9051e6998a.jpg"
      />
    </main>
  );
}
