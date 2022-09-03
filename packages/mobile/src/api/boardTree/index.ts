import http from "src/api/core";

export const fetchBoardTrees = (): Promise<res.BoardTrees[]> => {
  return http.get("/board-tree");
};

export const fetchBoardTree = (
  boardId: req.BoardTree["boardId"],
): Promise<res.BoardTree> => {
  return http.get(`/board-tree/${boardId}`);
};
