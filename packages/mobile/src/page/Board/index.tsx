import React from "react";

import { Close, LeftArrow } from "@components/atoms/icon";
import FullPageModalTemplate from "@components/templates/FullPageModalTemplate";
import BoardList from "src/page/Board/components/BoardList";
import BreadCrumb from "src/page/Board/components/BreadCrumb";
import Title from "src/page/Board/components/Title";

import $ from "./style.module.scss";

function Board() {
  return (
    <div className={$.board}>
      <FullPageModalTemplate
        left={<LeftArrow stroke="#AAAAAA" size={16} />}
        right={<Close size={16} stroke="#AAAAAA" />}
      >
        <div className={$.children}>
          <BreadCrumb />
          <Title />
          <BoardList />
        </div>
      </FullPageModalTemplate>
    </div>
  );
}

export default Board;
