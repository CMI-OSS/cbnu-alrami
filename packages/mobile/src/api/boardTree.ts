import { useQuery } from "react-query";

import { AxiosResponse } from "axios";
import caxios from "src/api/caxios";

const fetchBoardTree = () => {
  return caxios.get<res.BoardTree[]>("/board-tree");
};

export const useBoardTree = () => {
  const response = useQuery<AxiosResponse<res.BoardTree[]>, Error>(
    "boardTree",
    fetchBoardTree,
    { staleTime: 3000, cacheTime: 3000 },
  );
  return response;
};

export const useBoardTreeByBoard = (boardIds: string[]) => {
  const boardTrees = useBoardTree()?.data?.data;

  let content = boardTrees;
  let breadcrumb = `전체`;

  for (let i = 0; i < boardIds.length; i += 1) {
    const parent = content?.find((boardTree) => {
      return boardTree.id === Number(boardIds[i]);
    });
    content = parent?.children;
    breadcrumb += `> ${parent?.name}`;
  }

  return {
    breadcrumb,
    content,
  };
};
