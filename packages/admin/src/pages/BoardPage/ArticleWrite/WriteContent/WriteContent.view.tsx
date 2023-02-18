/* eslint-disable @typescript-eslint/ban-ts-comment */
import { memo, useMemo } from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

import $ from "./WriteContent.module.scss";

export interface Props {
  content: string;
  onChangeContent: (content: string) => void;
}

function WriteContentView({ content, onChangeContent }: Props) {
  const editorModules = useMemo(
    () => ({
      toolbar: {
        container: [
          [ { header: [ 1, 2, 3, false ] }, { color: [] } ],
          [ "bold", "italic", "underline", "strike" ],
        ],
      },
    }),
    [],
  );

  return (
    // @ts-ignore
    <ReactQuill
      className={$.editor}
      value={content}
      onChange={(v: string) => {
        onChangeContent(v);
      }}
      modules={editorModules}
      theme="snow"
      placeholder="내용을 입력해주세요."
    />
  );
}

export default memo(WriteContentView);
