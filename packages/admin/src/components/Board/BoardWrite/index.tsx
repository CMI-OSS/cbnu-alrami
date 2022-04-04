import React, { useEffect, useRef, useState, useCallback } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useWindowResize, useDebounceInput } from "src/hooks/";
import { boardCategories } from "src/__mockData__";
import Editor from "src/components/Editor";
import { useAppDispatch, useAppSelector } from "src/store";
import { writeBoard } from "src/store/boardSlice";
import classNames from "classnames";
import $ from "./style.module.scss";

export default function BoardWrite() {
  const [ width ] = useWindowResize();
  const dispatch = useAppDispatch();
  const { boardTitle, boardCategory, boardContent } = useAppSelector(
    (state) => state.boardReducer.board.write,
  );
  const [ error, setError ] = useState({
    title: false,
    category: false,
    content: false,
  });
  const [ title, setTitle ] = useState(boardTitle);
  const [ category, setCategory ] = useState(boardCategory);
  const [ isSubmit, setIsSubmit ] = useState(false);
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const hintRef = useRef<HTMLSpanElement | null>(null);
  const handleTitle = useDebounceInput<string>(setTitle);
  const handleCategory = useDebounceInput<string>(setCategory);
  const isContentExisting = boardContent !== "<p><br></p>";
  const isNotInitialContent = boardContent !== "";

  useEffect(() => {
    autoResizeTextArea();
    return () => autoResizeTextArea();
  }, [ width ]);

  useEffect(() => {
    dispatch(writeBoard({ boardTitle: title }));
  }, [ title ]);

  useEffect(() => {
    dispatch(writeBoard({ boardCategory: category }));
  }, [ category ]);

  useEffect(() => {
    error.content = !(!isNotInitialContent || isContentExisting);
    setError({ ...error });
    if (boardContent)
      if (previewRef.current) previewRef.current.innerHTML = boardContent;
  }, [ boardContent ]);

  useEffect(() => {
    if (
      isSubmit &&
      Object.values(error).every((x) => !x) &&
      isContentExisting &&
      isNotInitialContent
    ) {
      console.log({
        // Todo: API communication
        boardTitle: title,
        boardCategory: category,
        boardContent,
      });
    }
    setIsSubmit(false);
  }, [ isSubmit ]);

  const autoResizeTextArea = useCallback(() => {
    if (textRef.current) {
      textRef.current.style.height = "auto";
      textRef.current.style.height = `${textRef.current.scrollHeight}px`;
    }
  }, []);

  const handleSubmit = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    error.title = !title.length;
    error.category = !category.length;
    setError({ ...error });
    setIsSubmit(true);
  };

  return (
    <div className={$.boardWrite}>
      <form>
        <header>
          <textarea
            className={classNames($.title, { [$.warn]: error.title })}
            placeholder="제목을 입력하세요."
            defaultValue={title}
            onChange={(e) => {
              handleTitle(e.target.value);
              autoResizeTextArea();
            }}
            ref={textRef}
          />
          <hr />
        </header>

        <span id="category-hint" className={$.hint} ref={hintRef}>
          <IoMdArrowDropdown />
          게시판 선택, 검색
        </span>
        <div className={$.category}>
          <input
            type="text"
            list="boardList"
            aria-describedby="category-hint"
            className={error.category ? $.warn : ""}
            placeholder="게시판 선택, 검색"
            defaultValue={category}
            autoComplete="off"
            onChange={(e) => {
              if (hintRef.current) {
                hintRef.current.style.visibility =
                  e.target.value !== "" ? "visible" : "hidden";
              }
              handleCategory(e.target.value);
            }}
          />
          <datalist id="boardList">
            {boardCategories.map(({ name }) => (
              <option key={name} value={name} aria-label={name} />
            ))}
          </datalist>
        </div>

        <Editor />
        <span className={$["content-error"]}>
          {error.content ? "내용을 입력해주세요." : ""}
        </span>

        <input
          className={$.submit}
          type="submit"
          value="출간하기"
          onClick={(e) => handleSubmit(e)}
        />
      </form>

      <section>
        <strong className={$.title}>{title}</strong>
        <div ref={previewRef}></div>
      </section>
    </div>
  );
}
