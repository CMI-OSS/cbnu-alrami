import { useQuery } from "react-query";

import { AxiosResponse } from "axios";
import caxios from "src/api/caxios";

export const fetchArticlesByBoard = (boardId: number, data: req.Pagination) => {
  return caxios.get<res.ArticleByBoardPagination>(
    `/boards/${boardId}/articles`,
    {
      data,
    },
  );
};

export const useArticlesByBoard = (boardId: number, data: req.Pagination) => {
  const response = useQuery<AxiosResponse<res.ArticleByBoardPagination>, Error>(
    [ "articles", boardId ],
    () => {
      return fetchArticlesByBoard(boardId, data);
    },
  );
  return response;
};

export const fetchArticle = (articleId: number) => {
  return caxios.get<res.Article>(`/boards/articles/${articleId}`);
};

export const useArticle = (articleId: number) => {
  const response = useQuery<AxiosResponse<res.Article>, Error>(
    [ "article", articleId ],
    () => {
      return fetchArticle(articleId);
    },
  );
  return response;
};

export const fetchPopularArticles = () => {
  return caxios.get<res.ArticleByBoard[]>(`/articles/popular`);
};

export const usePopularArticles = () => {
  const response = useQuery<AxiosResponse<res.ArticleByBoard[]>, Error>(
    "popularArticles",
    fetchPopularArticles,
  );
  return response;
};

export const fetchBookmarkArticles = () => {
  return caxios.get<res.ArticleByBoard[]>(`/articles/bookmarks`);
};

export const useBookmarkArticles = () => {
  const response = useQuery<AxiosResponse<res.ArticleByBoard[]>, Error>(
    "bookmarkArticles",
    fetchBookmarkArticles,
  );
  return response;
};

export const fetchNewArticles = (data: req.Pagination) => {
  return caxios.get<res.ArticleByBoardPagination>(`/articles/subscribe`, {
    data,
  });
};

export const useNewArticles = (data: req.Pagination) => {
  const response = useQuery<AxiosResponse<res.ArticleByBoardPagination>, Error>(
    "newArticles",
    () => {
      return fetchNewArticles(data);
    },
  );
  return response;
};
