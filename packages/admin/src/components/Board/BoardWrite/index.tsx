import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useWindowResize } from "src/hooks/";
import { boardCategory } from "src/__mockData__";
import Editor from "src/components/Editor";
import { useAppDispatch, useAppSelector } from "src/store";
import { writeBoard } from "src/store/boardSlice";
import { debounce } from "src/lib/debounce";
import $ from "./style.module.scss";

export default function BoardWrite() {
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const [ error, setError ] = useState({
    title: false,
    boardKind: false,
  });
  const [ title, setTitle ] = useState("");
  const [ boardKind, setBoardKind ] = useState("");
  const [ width ] = useWindowResize();
  const dispatch = useAppDispatch();
  const boardState = useAppSelector((state) => state.boardReducer.board.write);

  useEffect(() => {
    autoResizeTextArea();
    return () => autoResizeTextArea();
  }, [ width ]);

  useEffect(() => {
    dispatch(writeBoard({ title }));
  }, [ title ]);

  useEffect(() => {
    dispatch(writeBoard({ boardKind }));
  }, [ boardKind ]);

  useEffect(() => {
    if (
      Object.values(boardState).every((x) => {
        if (boardState.boardContent === "<p><br></p>") return false;
        return x !== "";
      })
    )
      console.log({ title, boardKind, boardContent: boardState.boardContent }); // Todo: API communication
  }, [ error ]);

  const autoResizeTextArea = useCallback(() => {
    textRef.current!.style.height = "auto";
    textRef.current!.style.height = `${textRef.current!.scrollHeight}px`;
  }, []);

  const handleTitle = useMemo(
    () =>
      debounce<React.ChangeEvent<HTMLTextAreaElement>>(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => setTitle(e.target.value),
        200,
      ),
    [],
  );

  const handleBoardKind = useMemo(
    () =>
      debounce<React.ChangeEvent<HTMLInputElement>>(
        (e: React.ChangeEvent<HTMLInputElement>) =>
          setBoardKind(e.target.value),
        200,
      ),
    [],
  );

  const handleSubmit = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    if (!title.length) error.title = true;
    else error.title = false;
    if (!boardKind.length) error.boardKind = true;
    else error.boardKind = false;
    setError({ ...error });
  };

  return (
    <form className={$.form}>
      <section>
        <header>
          <textarea
            className={error.title ? $.warn : ""}
            placeholder="제목을 입력하세요."
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
            className={error.boardKind ? $.warn : ""}
            placeholder="게시판 선택, 검색"
            onChange={(e) => {
              handleBoardKind(e);
            }}
            autoComplete="off"
          />
          <IoMdArrowDropdown />
          <datalist id="boardList">
            {boardCategory.map(({ name }) => (
              <option key={name} value={name} aria-label={name} />
            ))}
          </datalist>
        </div>
        <Editor />
      </section>
      <input
        className={$.submit}
        type="submit"
        value="출간하기"
        onClick={(e) => handleSubmit(e)}
      />
    </form>
  );
}
