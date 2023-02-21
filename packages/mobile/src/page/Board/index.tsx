import React from "react";
import { Link } from "react-router-dom";

import { Close, LeftArrow } from "@components/atoms/icon";
import FullPageModalTemplate from "@components/templates/FullPageModalTemplate";
import { useRecoilValue } from "recoil";
import BoardList from "src/page/Board/components/BoardList";
import BreadCrumb from "src/page/Board/components/BreadCrumb";
import Title from "src/page/Board/components/Title";
import { boardOriginStatus } from "src/states";

import $ from "./style.module.scss";

function Board() {
  const boardOrigin = useRecoilValue(boardOriginStatus);
  const to =
    boardOrigin === "setting" ? `/setting/board` : "/article/subscribe";

  return (
    <div className={$.board}>
      <FullPageModalTemplate
        left={<LeftArrow stroke="#AAAAAA" size={16} />}
        right={
          <Link to={to}>
            <Close size={16} stroke="#AAAAAA" />
          </Link>
        }
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
