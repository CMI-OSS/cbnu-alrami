import { useQuery } from "react-query";

import { AxiosResponse } from "axios";
import caxios from "src/api/caxios";

type BoardTreeChildrenProps = {
  description: string;
  link: string;
  children?: BoardTreeChildrenProps[];
} & res.BoardTreeChildren;

type Props = {
  breadcrumb: string;
  guide: string;
  children: BoardTreeChildrenProps[];
} & res.BoardTree;

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

export const useBeginningBoardTree = () => {
  const boardTrees = useBoardTree()?.data?.data;

  const getDescription = (name: string) => {
    if (name === "공통") return "충북대학교의 다양한 공지사항을 확인해요";
    if (name === "전공") return "전공 별 공지사항을 확인해요";
    return "학생회의 공지를 받아볼 수 있어요";
  };

  return {
    breadcrumb: "전체",
    guide: "어떤 공지를\n받아볼까요?",
    content: boardTrees?.map((boardTree) => {
      return {
        ...boardTree,
        description: getDescription(boardTree.name),
      };
    }),
  };
};

export const useBoardTreeByBoard = (boardIds: string[]) => {
  let boardTrees = useBoardTree()?.data?.data;

  for (let i = 0; i < boardIds.length; i += 1) {
    boardTrees = boardTrees?.find((boardTree) => {
      return boardTree.id === Number(boardIds[i]);
    })?.children;
  }

  return { content: boardTrees };
};
