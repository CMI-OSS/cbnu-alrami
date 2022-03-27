import { useRef, useState, useMemo, useEffect, useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { debounce } from "src/lib/debounce";
import $ from "./style.module.scss";

export default function Editor() {
  const quillRef = useRef<ReactQuill>();
  const preview = useRef<HTMLDivElement | null>(null);
  const [ contents, setContents ] = useState("");

  useEffect(() => {
    preview.current!.innerHTML = contents;
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
  const handleInput = useMemo(()=>debounce<string>(changeHandler, 200), []);

  return (
    <main className={$.editorContainer}>
      <ReactQuill
        className={$.editor}
        ref={(element) => {
          if (element !== null) {
            quillRef.current = element;
          }
        }}
        value={contents}
        onChange={handleInput}
        modules={editorModules}
        theme="snow"
        placeholder="내용을 입력해주세요."
      />
      <section ref={preview}></section>
    </main>
  );
}
