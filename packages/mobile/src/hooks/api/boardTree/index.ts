import { useCoreQuery } from "@hooks/api/core";
import { getBoardTree, getBoardTrees } from "src/api/boardTree/index";
import { queryKey } from "src/consts/react-query";

export const useBoardTreesQuery = () => {
  return useCoreQuery<res.BoardTrees[], res.BoardTrees[]>(
    queryKey.boardTrees,
    () => {
      return getBoardTrees();
    },
  );
};

export const useBoardTreeQuery = (boardId: req.BoardTree["boardId"]) => {
  return useCoreQuery(queryKey.boardTree, () => {
    return getBoardTree(boardId);
  });
};
