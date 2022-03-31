import classNames from "classnames";
import { useRef, useState, useMemo, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useWindowResize } from "src/hooks";
import { debounce } from "src/lib/debounce";
import { useAppDispatch } from "src/store";
import { writeBoard } from "src/store/boardSlice";
import $ from "./style.module.scss";

export default function Editor() {
  const quillRef = useRef<ReactQuill>();
  // const preview = useRef<HTMLDivElement | null>(null);
  // const [ toolbarHeight, setToolbarHeight ] = useState(0);
  // const [width] = useWindowResize();
  const dispatch = useAppDispatch();
  const [ contents, setContents ] = useState("");
  const [ error, setError ] = useState(false);

  useEffect(() => {
    if (contents === "<p><br></p>") setError(true);
    else setError(false);
    dispatch(writeBoard({ boardContent: contents }));
  }, [ contents ]);

  // useEffect(() => {
  //   setToolbarHeight(document.querySelector(".ql-toolbar")?.clientHeight ?? 64);
  // }, [ width ]);

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
    <>
      <main className={$["editor-container"]}>
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
        {/* <section
          ref={preview}
          style={{ height: `${578 + toolbarHeight}px` }}
        ></section> */}
      </main>
    </>
  );
}
