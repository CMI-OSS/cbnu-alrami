import { Board } from "@shared/swagger-api/generated/models/Board";
import classnames from "classnames";

import $ from "./Board.module.scss";
import BoardCardView from "./BoardCard.view";

interface Props {
  boards: Board[];
  onClick?: (board: Board) => any;
}

export default function BoardTableView({ boards, onClick }: Props) {
  return (
    <div className={$.table}>
      <div className={classnames($.row, $.header)}>
        <div className={classnames($.cell, $.id)}>ID</div>
        <div className={classnames($.cell, $.title)}>이름</div>
        <div className={classnames($.cell, $.scraps)}>URL</div>
        <div className={classnames($.cell, $.scraps)}>수정</div>
      </div>
      {boards.map((board) => {
        return <BoardCardView onClick={onClick} board={board} />;
      })}
    </div>
  );
}
