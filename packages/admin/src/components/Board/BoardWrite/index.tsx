import { cx } from "@emotion/css";
import { useEffect, useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useWindowResize } from "src/hooks/";
import getStyle from "./style";

export default function BoardWrite() {
  const style = getStyle();
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const [ width ] = useWindowResize();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    autoResizeTextArea();
    return () => autoResizeTextArea();
  }, [ width ]);

  const onSubmit = (data: any) => console.log(data);

  const title = {
    ...register("title", {
      required: true,
    }),
  };

  const autoResizeTextArea = useCallback(() => {
    textRef.current!.style.height = "auto";
    textRef.current!.style.height = `${textRef.current!.scrollHeight}px`;
  }, []);

  return (
    <form className={style.main} onSubmit={handleSubmit(onSubmit)}>
      <section className={style.titleBox}>
        <textarea
          id="title"
          name={title.name}
          className={cx(style.title, { [style.warn]: errors.title })}
          placeholder="제목을 입력하세요."
          onChange={autoResizeTextArea}
          ref={(e) => {
            title.ref(e);
            textRef.current = e;
          }}
        />
        <hr className={style.horizonLine} />
      </section>

      <input className={style.submit} type="submit" value="출간하기" />
    </form>
  );
}
