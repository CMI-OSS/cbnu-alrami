import http from "src/api/core";
import { Pagination } from "src/type/api";

export const fetchArticle = (
  articleId: req.Article["articleId"],
): Promise<res.Article> => {
  return http.get(`/boards/articles/${articleId}`);
};

export const fetchBoardArticles = (
  params: req.Pagination,
): Promise<Pagination<res.BoardArticle>> => {
  return http.get(`/boards/${params.boardId}/articles`, { params });
};

export const fetchBookmarkArticles = (): Promise<
  Pagination<res.BoardArticle>
> => {
  return http.get(`/articles/bookmarks`);
};

export const fetchNewArticles = (
  params: req.Pagination,
): Promise<Pagination<res.BoardArticle>> => {
  return http.get(`/articles/subscribe`, { params });
};

export const fetchPopularArticles = (): Promise<
  Pagination<res.BoardArticle>
> => {
  return http.get(`/articles/popular`);
};
