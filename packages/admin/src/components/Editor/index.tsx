import { useRef, useState, useMemo, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDebounceInput } from "src/hooks";
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
  const handleContents = useDebounceInput<string>(setContents);

  useEffect(() => {
    if (contents !== "") dispatch(writeBoard({ boardContent: contents }));
  }, [ contents ]);

  const editorModules = useMemo(
    () => ({
      toolbar: {
        container: [
          [ { size: [ "small", false, "large", "huge" ] }, { color: [] } ],
          [ "bold", "italic", "underline", "strike" ],
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

  return (
    <ReactQuill
      className={$.editor}
      ref={(element) => {
        if (element !== null) {
          quillRef.current = element;
        }
      }}
      value={contents}
      onChange={(v) => {
        handleContents(v);
      }}
      modules={editorModules}
      theme="snow"
      placeholder="내용을 입력해주세요."
    />
  );
}
