import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useWindowResize } from "src/hooks/";
import { boardCategories } from "src/__mockData__";
import Editor from "src/components/Editor";
import { useAppDispatch, useAppSelector } from "src/store";
import { writeBoard } from "src/store/boardSlice";
import { debounce } from "src/lib/debounce";
import classNames from "classnames";
import $ from "./style.module.scss";

export default function BoardWrite() {
  const [ error, setError ] = useState({
    title: false,
    category: false,
  });
  const [ width ] = useWindowResize();
  const dispatch = useAppDispatch();
  const { boardTitle, boardCategory, boardContent } = useAppSelector(
    (state) => state.boardReducer.board.write,
  );
  const [ title, setTitle ] = useState(boardTitle);
  const [ category, setCategory ] = useState(boardCategory);
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const preview = useRef<HTMLDivElement | null>(null);

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
    preview.current!.innerHTML = boardContent;
  }, [ boardContent ]);

  useEffect(() => {
    if (
      Object.values(error).every((x) => x) &&
      boardContent !== "<p><br></p>" &&
      boardContent !== ""
    )
      console.log({
        boardTitle: title,
        boardCategory: category,
        boardContent,
      }); // Todo: API communication
  }, [ error ]);

  const autoResizeTextArea = useCallback(() => {
    textRef.current!.style.height = "auto";
    textRef.current!.style.height = `${textRef.current!.scrollHeight}px`;
  }, []);

  const handleTitle = useMemo(
    // Todo: 함수 템플릿 만들기
    () =>
      debounce<React.ChangeEvent<HTMLTextAreaElement>>(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => setTitle(e.target.value),
        200,
      ),
    [],
  );

  const handleType = useMemo(
    // Todo: 함수 템플릿 만들기
    () =>
      debounce<React.ChangeEvent<HTMLInputElement>>(
        (e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value),
        200,
      ),
    [],
  );

  const handleSubmit = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    if (!title.length) error.title = true;
    else error.title = false;
    if (!category.length) error.category = true;
    else error.category = false;
    setError({ ...error });
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
              handleTitle(e);
              autoResizeTextArea();
            }}
            ref={textRef}
          />
          <hr />
        </header>

        <div className={$.category}>
          <input
            type="text"
            list="boardList"
            className={error.category ? $.warn : ""}
            placeholder="게시판 선택, 검색"
            defaultValue={category}
            onChange={(e) => {
              handleType(e);
            }}
            autoComplete="off"
          />
          <IoMdArrowDropdown />
          <datalist id="boardList">
            {boardCategories.map(({ name }) => (
              <option key={name} value={name} aria-label={name} />
            ))}
          </datalist>
        </div>
        <Editor />
        <input
          className={$.submit}
          type="submit"
          value="출간하기"
          onClick={(e) => handleSubmit(e)}
        />
      </form>
      <section>
        <p className={$.title}>{title}</p>
        <div ref={preview}></div>
      </section>
    </div>
  );
}
