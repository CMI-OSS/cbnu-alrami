import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useWindowResize } from "src/hooks/";
// import { Checkbox } from "@shared/components";
import { boardKind } from "src/__mockData__";
import classNames from "classnames";
import Editor from "src/components/Editor";
import $ from "./style.module.scss";

export default function BoardWrite() {
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const [ isReserve, setReserve ] = useState(false);
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

  const autoResizeTextArea = useCallback(() => {
    textRef.current!.style.height = "auto";
    textRef.current!.style.height = `${textRef.current!.scrollHeight}px`;
  }, []);

  const dateArr = useMemo(() => {
    if (isReserve) {
      const date = new Date();
      return [
        ...date.toLocaleDateString().replace(/\./g, "").split(" "),
        ...date.toTimeString().split(" ")[0].split(":").slice(0, 2),
      ];
    }
    return undefined;
  }, [ isReserve ]);

  const onSubmit = (data: any) => console.log(data);

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

  useEffect(() => {
    console.log(errors);
  }, [ errors ]);

  return (
    <form className={$.form} onSubmit={handleSubmit(onSubmit)}>
      <header>
        <textarea
          id="title"
          name={title.name}
          className={errors.title ? $.warn : ""}
          placeholder="제목을 입력하세요."
          onChange={autoResizeTextArea}
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
            id="boardType"
            name={boardType.name}
            className={classNames($.boardType, $.option, {
              [$.warn]: errors.boardType,
            })}
            placeholder="카테고리 선택, 검색"
            autoComplete="off"
            ref={boardType.ref}
          />
          <datalist id="boardList">
            {boardKind.map(({ name }) => (
              <option key={name} value={name} aria-label={name} />
            ))}
          </datalist>
        </div>

        {/* <Checkbox id="isNotice" text="알림 받기" className={$.option} />
        <Checkbox
          id="isReserve"
          text="예약하기"
          onChange={() => setReserve(!isReserve)}
          className={$.option}
        /> */}
        {isReserve}
      </section>

      <Editor />

      <input className={$.submit} type="submit" value="출간하기" />
    </form>
  );
}
