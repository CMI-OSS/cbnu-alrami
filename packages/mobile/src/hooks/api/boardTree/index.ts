import { useCoreQuery } from "@hooks/api/core";
import { fetchBoardTree, fetchBoardTrees } from "src/api/boardTree/index";
import { queryKey } from "src/consts/react-query";

export const useBoardTreesQuery = () => {
  return useCoreQuery<res.BoardTrees[], res.BoardTrees[]>(
    queryKey.boardTrees,
    () => {
      return fetchBoardTrees();
    },
  );
};

export const useBoardTreeQuery = (boardId: req.BoardTree["boardId"]) => {
  return useCoreQuery(queryKey.boardTree, () => {
    return fetchBoardTree(boardId);
  });
};
