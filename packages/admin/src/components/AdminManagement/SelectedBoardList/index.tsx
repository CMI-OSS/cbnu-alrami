import { MdCancel } from "react-icons/md";

import $ from "./style.module.scss";

type Props = {
  boards: string[];
  onDeleteBoard: (board: string) => void;
};

export default function SelectedBoardList({
  boards,
  onDeleteBoard: handleDeleteBoard,
}: Props) {
  return (
    <>
      <h2 className={$["boardlist-title"]}>관리 보드 리스트</h2>
      <ul>
        {boards.map((board) => {
          return (
            <li key={board} className={$["board-item"]}>
              <span>{board}</span>
              <button
                type="button"
                aria-label="이 보드 관리 권한 삭제"
                onClick={() => {
                  return handleDeleteBoard(board);
                }}
                className={$["delete-board-button"]}
              >
                <MdCancel />
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
