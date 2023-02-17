import http from "src/api/core";
import { Pagination } from "src/type/api";

export const getBoardArticles = (
  params: req.Pagination,
): Promise<Pagination<res.BoardArticle>> => {
  return http.get(`/boards/${params.boardId}/articles`, { params });
};
