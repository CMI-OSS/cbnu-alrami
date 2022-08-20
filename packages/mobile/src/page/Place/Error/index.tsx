import React, { useState } from "react";

import { Airplane } from "@components/atoms/icon/Airplane";
import MapHeader from "@components/molecules/MapHeader";

import $ from "./style.module.scss";

// TODO: FullPageModalTemplate | Chloe
function Error() {
  const [ textarea, setTextarea ] = useState("");
  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextarea(e.target.value);
  };
  return (
    <div className={$.wrap}>
      <MapHeader title="오류 신고" />
      <textarea
        placeholder="내용을 입력해주세요"
        className={$.textarea}
        onChange={handleTextarea}
        value={textarea}
      />
      <button type="button" className={$.button}>
        <Airplane size={34} stroke="#fff" />
      </button>
    </div>
  );
}

export default Error;
