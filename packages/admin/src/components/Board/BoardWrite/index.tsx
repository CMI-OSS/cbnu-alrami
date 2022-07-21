import React, { useEffect, useRef, useState, useCallback } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

import classNames from "classnames";
import { boardCategories } from "src/__mockData__";
import Editor from "src/components/Editor";
import ImgUploadSlides from "src/components/ImgUploadSlides";
import { useDebounceInput, useWindowResize } from "src/hooks";
import { useAppDispatch, useAppSelector } from "src/store";
import { writeBoard } from "src/store/boardSlice";

import $ from "./style.module.scss";

export default function BoardWrite() {
  const { boardImgList, boardTitle, boardCategory, boardContent } =
    useAppSelector((state) => state.boardReducer.board.write);
  const dispatch = useAppDispatch();
  const [ error, setError ] = useState({
    title: false,
    category: false,
    content: false,
  });
  const [ title, setTitle ] = useState<string>(boardTitle);
  const [ category, setCategory ] = useState<string>(boardCategory);
  const refs = useRef<HTMLElement[]>([]);
  const [ width ] = useWindowResize();
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
    setError({
      ...error,
      content: !(!isNotInitialContent || isContentExisting),
    });
    if (boardContent)
      if (refs.current) refs.current[2].innerHTML = boardContent;
  }, [ boardContent ]);

  const autoResizeTextArea = useCallback(() => {
    if (refs.current[0]) {
      refs.current[0].style.height = "auto";
      refs.current[0].style.height = `${refs.current[0].scrollHeight}px`;
    }
  }, []);

  const handleSubmit = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    const isTitleError = !title.length;
    const isCategoryError = !category.length;
    const isContentError = !(isContentExisting && isNotInitialContent);
    if (isTitleError || isCategoryError || isContentError) {
      setError({
        title: isTitleError,
        category: isCategoryError,
        content: isContentError,
      });
      return;
    }
    console.log({
      // Todo: API communication
      boardImgList,
      boardTitle: title,
      boardCategory: category,
      boardContent,
    });
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
            style={{ minHeight: "105px" }}
            ref={(elem) => {
              refs.current[0] = elem as HTMLTextAreaElement;
            }}
          />
          <hr />
        </header>

        <span
          id="category-hint"
          className={$.hint}
          ref={(elem) => {
            refs.current[1] = elem as HTMLSpanElement;
          }}
        >
          <IoMdArrowDropdown />
          게시판 선택, 검색
        </span>
        <div className={$.category}>
          <input
            type="text"
            list="boardList"
            aria-describedby="category-hint"
            className={classNames(error.category && $.warn)}
            placeholder="게시판 선택, 검색"
            defaultValue={category}
            autoComplete="off"
            onChange={(e) => {
              if (refs.current) {
                refs.current[1].style.visibility = e.target.value
                  ? "visible"
                  : "hidden";
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

        <ImgUploadSlides imgList={boardImgList} />

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
        <div
          ref={(elem) => {
            refs.current[2] = elem as HTMLDivElement;
          }}
        ></div>
      </section>
    </div>
  );
}
