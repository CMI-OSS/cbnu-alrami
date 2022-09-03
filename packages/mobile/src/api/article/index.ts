import http from "src/api/core";
import { Pagination } from "src/type/api";

export const getArticle = (
  articleId: req.Article["articleId"],
): Promise<res.Article> => {
  return http.get(`/boards/articles/${articleId}`);
};

export const getBoardArticles = (
  params: req.Pagination,
): Promise<Pagination<res.BoardArticle>> => {
  return http.get(`/boards/${params.boardId}/articles`, { params });
};

export const getBookmarkArticles = (): Promise<
  Pagination<res.BoardArticle>
> => {
  return http.get(`/articles/bookmarks`);
};

export const getNewArticles = (
  params: req.Pagination,
): Promise<Pagination<res.BoardArticle>> => {
  return http.get(`/articles/subscribe`, { params });
};

export const getPopularArticles = (): Promise<Pagination<res.BoardArticle>> => {
  return http.get(`/articles/popular`);
};
