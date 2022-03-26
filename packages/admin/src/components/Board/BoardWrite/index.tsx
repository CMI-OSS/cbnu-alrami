import { useEffect, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useWindowResize } from "src/hooks/";
import { boardKind } from "src/__mockData__";
import classNames from "classnames";
import Editor from "src/components/Editor";
import $ from "./style.module.scss";

export default function BoardWrite() {
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const [ width ] = useWindowResize();

  useEffect(() => {
    autoResizeTextArea();
    return () => autoResizeTextArea();
  }, [ width ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const autoResizeTextArea = useCallback(() => {
    textRef.current!.style.height = "auto";
    textRef.current!.style.height = `${textRef.current!.scrollHeight}px`;
  }, []);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const title = {
    ...register("title", {
      required: true,
    }),
  };
  const boardType = {
    ...register("boardType", {
      required: true,
    }),
  };

  return (
    <form className={$.form} onSubmit={handleSubmit(onSubmit)}>
      <header>
        <textarea
          name={title.name}
          className={errors.title ? $.warn : ""}
          placeholder="제목을 입력하세요."
          onChange={(e) => {
            title.onChange(e);
            autoResizeTextArea();
          }}
          ref={(e) => {
            title.ref(e);
            textRef.current = e;
          }}
        />
        <hr />
      </header>

      <section className={$.boardOption}>
        <div>
          <input
            type="text"
            list="boardList"
            name={boardType.name}
            className={classNames($.boardType, $.option, {
              [$.warn]: errors.boardType,
            })}
            placeholder="카테고리 선택, 검색"
            onChange={boardType.onChange}
            autoComplete="off"
            ref={boardType.ref}
          />
          <datalist id="boardList">
            {boardKind.map(({ name }) => (
              <option key={name} value={name} aria-label={name} />
            ))}
          </datalist>
        </div>
      </section>
      <Editor />
      <input className={$.submit} type="submit" value="출간하기" />
    </form>
  );
}
