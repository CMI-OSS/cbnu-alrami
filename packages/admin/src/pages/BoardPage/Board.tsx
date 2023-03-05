import { useMemo, useState } from "react";
import { useQuery } from "react-query";

import { Board as BoardType } from "@shared/swagger-api/generated/models/Board";
import { BoardApiService } from "@shared/swagger-api/generated/services/BoardApiService";
import { PropsType } from "src/types/utils";

import BoardTableView from "./BoardTable.view";
import BreadCrumb from "./BreadCrumb.view";

const allBoard: BoardType = {
  id: 0,
  name: "전체",
  createdDateTime: "",
  updatedDateTime: "",
};

const Board = () => {
  const { data } = useQuery([ "boards" ], () =>
    BoardApiService.boardControllerFind({ uuid: undefined }),
  );

  const [ selectedBoardStack, setSelectedBoardStack ] = useState<BoardType[]>([
    allBoard,
  ]);

  const displayBoards = useMemo(() => {
    if (selectedBoardStack.length === 1) return data ?? [];

    return selectedBoardStack.at(-1)?.children ?? [];
  }, [ data, selectedBoardStack ]);

  if (!data) return null;

  const boardViewProp: PropsType<typeof BoardTableView> = {
    boards: displayBoards,

    onClick: (board) => {
      setSelectedBoardStack([ ...selectedBoardStack, board ]);
    },
  };

  const BreadCrumbViewProp: PropsType<typeof BreadCrumb> = {
    boards: selectedBoardStack,
    onClick: (board) => {
      const index = selectedBoardStack.findIndex(
        (_board) => _board.id === board.id,
      );
      setSelectedBoardStack(selectedBoardStack.slice(0, index + 1));
    },
  };

  return (
    <>
      <BreadCrumb {...BreadCrumbViewProp} />
      <BoardTableView {...boardViewProp} />
    </>
  );
};

export default Board;
