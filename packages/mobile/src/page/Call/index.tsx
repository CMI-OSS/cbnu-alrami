import React, { useState } from "react";

import MapHeader from "@components/molecules/MapHeader";

import $ from "./style.module.scss";

function Call() {
  const [ textarea, setTextarea ] = useState("");
  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextarea(e.target.value);
  };
  return (
    <>
      <MapHeader title="제보하기" />
      <textarea
        placeholder="내용을 입력해주세요"
        className={$.textarea}
        onChange={handleTextarea}
        value={textarea}
      ></textarea>
    </>
  );
}

export default Call;
