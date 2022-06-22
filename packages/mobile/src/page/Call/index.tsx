import React, { useState } from "react";

import { CallSubmit } from "@components/atoms/icon/CallSubmit";
import MapHeader from "@components/molecules/MapHeader";

import $ from "./style.module.scss";

function Call() {
  const [ textarea, setTextarea ] = useState("");
  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextarea(e.target.value);
  };
  return (
    <>
      <div className={$.wrap}>
        <MapHeader title="제보하기" />
        <textarea
          placeholder="내용을 입력해주세요"
          className={$.textarea}
          onChange={handleTextarea}
          value={textarea}
        />
        <button type="button" className={$.button}>
          <CallSubmit className={$.submit} />
        </button>
      </div>
    </>
  );
}

export default Call;
