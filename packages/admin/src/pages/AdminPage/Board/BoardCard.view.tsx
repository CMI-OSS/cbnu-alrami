import { Board } from "@shared/swagger-api/generated/models/Board";
import { Button } from "antd";
import classnames from "classnames";

import $ from "./Board.module.scss";

interface BoardCardViewProps {
  board: Board;
  onClick?: (board: Board) => any;
}

const BoardCardView = ({ board, onClick }: BoardCardViewProps) => {
  return (
    <div
      className={$.row}
      onClick={() => {
        if (board.children?.length) onClick?.(board);
      }}
    >
      <div className={classnames($.cell, $.id)}>{board.id}</div>
      <div className={classnames($.cell, $.title)}>{board.name}</div>
      <div className={classnames($.cell, $.scraps)}>{board.url}</div>
      <div className={classnames($.cell, $.scraps)}>
        <Button
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          수정
        </Button>
      </div>
    </div>
  );
};

export default BoardCardView;
