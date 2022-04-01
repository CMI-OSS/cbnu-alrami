import classNames from "classnames";
import { useRef, useState, useMemo, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { debounce } from "src/lib/debounce";
import { useAppDispatch, useAppSelector } from "src/store";
import { writeBoard } from "src/store/boardSlice";
import $ from "./style.module.scss";

export default function Editor() {
  const quillRef = useRef<ReactQuill>();
  const dispatch = useAppDispatch();
  const { boardContent } = useAppSelector(
    (state) => state.boardReducer.board.write,
  );
  const [ contents, setContents ] = useState(boardContent);
  const [ error, setError ] = useState(false);

  useEffect(() => {
    if (contents === "<p><br></p>") setError(true);
    else setError(false);
    if (contents !== "") dispatch(writeBoard({ boardContent: contents }));
  }, [ contents ]);

  const editorModules = useMemo(
    () => ({
      toolbar: {
        container: [
          [ { size: [ "small", false, "large", "huge" ] }, { color: [] } ],
          [ "bold", "italic", "underline", "strike", "blockquote" ],
          [ { list: "ordered" }, { list: "bullet" }, { align: [] } ],
          [ "image", "link" ],
        ],
        handlers: {
          //   image: imageHandler, // Todo: 이미지 핸들러 선언
        },
      },
    }),
    [],
  );

  // const imageHandler = () => {} // Todo: 이미지 핸들러 함수

  const changeHandler = (v: string) => setContents(v);
  const handleInput = useMemo(() => debounce<string>(changeHandler, 200), []);

  return (
    <ReactQuill
      className={classNames($.editor, { [$.warn]: error })}
      ref={(element) => {
        if (element !== null) {
          quillRef.current = element;
        }
      }}
      value={contents}
      onChange={(v) => {
        handleInput(v);
      }}
      modules={editorModules}
      theme="snow"
      placeholder="내용을 입력해주세요."
    />
  );
}
