import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import { OpenAPI } from "@shared/swagger-api/generated/core/OpenAPI";
import { AdminApiService } from "@shared/swagger-api/generated/services/AdminApiService";
import classnames from "classnames";

import $ from "./style.module.scss";

export default function LoginForm() {
  const [ message, setMessage ] = useState("");
  const [ isFocusId, setFocusId ] = useState(false);
  const [ isFocusPw, setFocusPw ] = useState(false);
  const [ isLock, setLock ] = useState(true);
  const navigate = useNavigate();

  const { mutate } = useMutation(
    "login",
    AdminApiService.adminControllerLogin,
    {
      onSuccess(data) {
        if (data) {
          if (data.accessToken) {
            OpenAPI.TOKEN = data.accessToken;
            localStorage.setItem("token", data.accessToken);
            navigate("/");
          }
        }
      },
      onError(error: any) {
        alert(error.body.message);
      },
    },
  );

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
    mutate({
      requestBody: {
        loginId: data.id,
        password: data.password,
      },
    });
  };

  return (
    <main className={$.main}>
      <span>충림이 관리자</span>
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
    </main>
  );
}
