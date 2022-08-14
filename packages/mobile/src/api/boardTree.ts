import { useQuery } from "react-query";

import { AxiosResponse } from "axios";
import caxios from "src/api/caxios";

const fetchBoardTrees = () => {
  return caxios.get<res.BoardTrees[]>("/board-tree");
};

export const useBoardTrees = () => {
  const response = useQuery<AxiosResponse<res.BoardTrees[]>, Error>(
    "boardTrees",
    fetchBoardTrees,
    { staleTime: 3000, cacheTime: 3000 },
  );
  return response;
};

export const useBoardTreesByBoard = (boardIds: string[]) => {
  const boardTrees = useBoardTrees()?.data?.data;

  let parent;
  let content = boardTrees;
  let breadcrumb = `전체`;

  for (let i = 0; i < boardIds.length; i += 1) {
    parent = content?.find((boardTree) => {
      return boardTree.id === Number(boardIds[i]);
    });
    content = parent?.children;
    breadcrumb += ` > ${parent?.name}`;
  }

  return {
    parent,
    breadcrumb,
    content,
  };
};

const fetchBoardTree = (boardId: number) => {
  return caxios.get<res.BoardTree>(`/board-tree/${boardId}`);
};

export const useBoardTree = (boardId: number) => {
  const response = useQuery<AxiosResponse<res.BoardTree>, Error>(
    "boardTree",
    () => {
      return fetchBoardTree(boardId);
    },
  );
  return response;
};
