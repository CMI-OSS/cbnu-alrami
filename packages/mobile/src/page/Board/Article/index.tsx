import React from "react";

import { LeftArrow } from "@components/atoms/icon";
import FullPageModalTemplate from "@components/templates/FullPageModalTemplate";

import $ from "./style.module.scss";

function BoardArticle() {
  return (
    <div className={$["board-article"]}>
      <FullPageModalTemplate left={<LeftArrow stroke="#AAAAAA" size={16} />}>
        <div className={$.children}>하히여</div>
      </FullPageModalTemplate>
    </div>
  );
}

export default BoardArticle;
