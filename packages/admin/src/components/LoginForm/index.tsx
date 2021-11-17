import { useState, useEffect } from "react";
import { cx } from "@emotion/css";
import { useForm } from "react-hook-form";
import { AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";
import getStyle from "./style";

interface FormProps {
  inputId: string;
  inputPw: string;
}

export default function LoginForm() {
  const [message, setMessage] = useState("");
  const [classNameId, setClassNameId] = useState(false);
  const [classNamePw, setClassNamePw] = useState(false);
  const [lock, setLock] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const style = getStyle();

  const onSubmit = (data: FormProps) => {
    console.log(data);
  };

  const id = register("id", { required: true });
  const password = register("password", { required: true });

  useEffect(() => {
    if (errors.id) setMessage("아이디를 입력해주세요.");
    else if (errors.password) setMessage("비밀번호를 입력해주세요.");
    else setMessage("");
    console.log(errors);
  }, [errors.id, errors.password]);

  return (
    <main className={style.loginForm}>
      <span className={style.title}>CMI 관리자</span>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={cx(style.idBox, { [style.isFocus]: classNameId })}>
          <IoPersonOutline className={style.icon} />
          <input
            className={style.id}
            placeholder="아이디"
            name={id.name}
            onChange={id.onChange}
            onFocus={() => setClassNameId(true)}
            onBlur={() => setClassNameId(false)}
            ref={id.ref}
          />
        </div>
        <div className={cx(style.pwBox, { [style.isFocus]: classNamePw })}>
          <button
            className={style.lockBox}
            type="button"
            onClick={() => {
              if (lock) setLock(false);
              else setLock(true);
            }}
          >
            {lock ? (
              <AiOutlineLock className={style.icon} />
            ) : (
              <AiOutlineUnlock className={style.unLock} />
            )}
          </button>
          <input
            type={lock ? "password" : "text"}
            className={style.password}
            placeholder="비밀번호"
            name={password.name}
            onChange={password.onChange}
            onFocus={() => setClassNamePw(true)}
            onBlur={() => setClassNamePw(false)}
            ref={password.ref}
          />
        </div>
        <p className={style.message}>{message}</p>

        <input className={style.submit} type="submit" value="로그인" />
      </form>
      <img
        className={style.img}
        alt="우왕이와 친구들"
        src="https://user-images.githubusercontent.com/62797441/141838255-94117137-98fb-4159-920b-5c9051e6998a.jpg"
      />
    </main>
  );
}
