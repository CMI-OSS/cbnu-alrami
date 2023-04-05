import React from "react";
import { Link } from "react-router-dom";

import { Close, LeftArrow } from "@components/atoms/icon";
import FullPageModalTemplate from "@components/templates/FullPageModalTemplate";
import BoardList from "src/page/Board/components/BoardList";
import BreadCrumb from "src/page/Board/components/BreadCrumb";
import Title from "src/page/Board/components/Title";
import { useAppSelector } from "src/store";

import $ from "./style.module.scss";

function Board() {
  const boardOrigin = useAppSelector((state) => {
    return state.noticeReducer.origin;
  });
  const to =
    boardOrigin === "setting" ? `/setting/board` : "/article/subscribe";
  return (
    <div className={$.board}>
      <FullPageModalTemplate
        left={<LeftArrow size={16} />}
        right={
          <Link to={to}>
            <Close size={16} />
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
