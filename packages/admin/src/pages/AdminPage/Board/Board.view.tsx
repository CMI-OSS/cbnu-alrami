import { Board } from "@shared/swagger-api/generated/models/Board";
import classnames from "classnames";

import $ from "./Board.module.scss";

interface Props {
  boards: Board[];
  onClick?: (board: Board) => any;
}

export default function BoardView({ boards, onClick }: Props) {
  return (
    <div className={$.table}>
      <div className={classnames($.row, $.header)}>
        <div className={classnames($.cell, $.id)}>ID</div>
        <div className={classnames($.cell, $.title)}>이름</div>
        <div className={classnames($.cell, $.scraps)}>URL</div>
      </div>
      {boards.map((board) => {
        return (
          <div className={$.row} onClick={() => onClick?.(board)}>
            <div className={classnames($.cell, $.id)}>{board.id}</div>
            <div className={classnames($.cell, $.title)}>{board.name}</div>
            <div className={classnames($.cell, $.scraps)}>{board.url}</div>
          </div>
        );
      })}
    </div>
  );
}
