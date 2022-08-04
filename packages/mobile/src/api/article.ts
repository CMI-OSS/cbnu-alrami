import { useQuery } from "react-query";

import { AxiosResponse } from "axios";
import caxios from "src/api/caxios";

const fetchPopularArticles = () => {
  return caxios.get<res.Popular[]>("/articles/popular");
};

export const usePopularArticles = () => {
  const response = useQuery<AxiosResponse<res.Popular[]>, Error>(
    "schedules",
    fetchPopularArticles,
  );
  return response;
};

export const fetchArticlesByBoardId = (boardId: number) => {
  return caxios.get<res.ArticleByBoardId[]>(`/boards/${boardId}/articles`);
};

export const useArticlesByBoardId = (boardId: number) => {
  const response = useQuery<AxiosResponse<res.ArticleByBoardId[]>, Error>(
    [ "articles", boardId ],
    () => fetchArticlesByBoardId(boardId),
  );
  return response;
};

export const fetchArticle = (articleId: number) => {
  return caxios.get<res.Article>(`/boards/articles/${articleId}`);
};

export const useArticle = (articleId: number) => {
  const response = useQuery<AxiosResponse<res.Article>, Error>(
    [ "article", articleId ],
    () => fetchArticle(articleId),
  );
  return response;
};
