import http from "src/api/core";

export const getBoardTrees = (): Promise<res.BoardTrees[]> => {
  return http.get("/board-tree");
};

export const getBoardTree = (
  boardId: req.BoardTree["boardId"],
): Promise<res.BoardTree> => {
  return http.get(`/board-tree/${boardId}`);
};
