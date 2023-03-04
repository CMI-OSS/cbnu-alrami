import { useMemo, useState } from "react";
import { useQuery } from "react-query";

import { Board as BoardType } from "@shared/swagger-api/generated/models/Board";
import { BoardApiService } from "@shared/swagger-api/generated/services/BoardApiService";
import { PropsType } from "src/types/utils";

import BoardView from "./Board.view";

const Board = () => {
  const { data } = useQuery([ "boards" ], () =>
    BoardApiService.boardControllerFind({ uuid: undefined }),
  );

  const [ selectedBoardStack, setSelectedBoardStack ] = useState<BoardType[]>([]);

  const displayBoards = useMemo(() => {
    if (selectedBoardStack.length === 0) return data ?? [];

    return selectedBoardStack.at(-1)?.children ?? [];
  }, [ data, selectedBoardStack ]);

  if (!data) return null;

  const viewProp: PropsType<typeof BoardView> = {
    boards: displayBoards,

    onClick: (board) => {
      setSelectedBoardStack([ ...selectedBoardStack, board ]);
    },
  };

  return <BoardView {...viewProp} />;
};

export default Board;
