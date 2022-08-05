import { useQuery } from "react-query";

import { AxiosResponse } from "axios";
import caxios from "src/api/caxios";

const fetchPopularArticle = () => {
  return caxios.get<res.Popular[]>("/articles/popular");
};

export const usePopularArticle = () => {
  const response = useQuery<AxiosResponse<res.Popular[]>, Error>(
    "popularArticle",
    fetchPopularArticle,
  );
  return response;
};

export const fetchArticleByBoard = (boardId: number) => {
  return caxios.get<res.ArticleByBoard[]>(`/boards/${boardId}/articles`);
};

export const useArticleByBoard = (boardId: number) => {
  const response = useQuery<AxiosResponse<res.ArticleByBoard[]>, Error>(
    [ "articles", boardId ],
    () => {
      return fetchArticleByBoard(boardId);
    },
  );
  return response;
};
