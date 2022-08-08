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

export const fetchArticlesByBoard = (boardId: number) => {
  return caxios.get<res.ArticleByBoard[]>(`/boards/${boardId}/articles`);
};

export const useArticlesByBoard = (boardId: number) => {
  const response = useQuery<AxiosResponse<res.ArticleByBoard[]>, Error>(
    [ "articles", boardId ],
    () => {
      return fetchArticlesByBoard(boardId);
    },
  );
  return response;
};

export const fetchArticles = (articleId: number) => {
  return caxios.get<res.Article>(`/boards/articles/${articleId}`);
};

export const useArticles = (articleId: number) => {
  const response = useQuery<AxiosResponse<res.Article>, Error>(
    [ "article", articleId ],
    () => {
      return fetchArticles(articleId);
    },
  );
  return response;
};
