import { useQuery } from "react-query";

import { AxiosResponse } from "axios";
import caxios from "src/api/caxios";

const fetchPopularArticles = () => {
  return caxios.get<res.Popular[]>("/articles/popular");
};

export const usePopularArticles = () => {
  const response = useQuery<AxiosResponse<res.Popular[]>, Error>(
    "popularArticle",
    fetchPopularArticles,
  );
  return response;
};

export const fetchArticlesByBoard = (boardId: number, data: req.Pagination) => {
  return caxios.get<res.ArticleByBoard>(`/boards/${boardId}/articles`, {
    data,
  });
};

export const useArticlesByBoard = (boardId: number, data: req.Pagination) => {
  const response = useQuery<AxiosResponse<res.ArticleByBoard>, Error>(
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
