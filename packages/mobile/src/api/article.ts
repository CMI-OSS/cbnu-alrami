import { useQuery } from "react-query";

import { AxiosResponse } from "axios";
import caxios from "src/api/caxios";

const fetchPopularArticle = () => {
  return caxios.get<res.Popular[]>("/articles/popular");
};

export const usePopularArticle = () => {
  const response = useQuery<AxiosResponse<res.Popular[]>, Error>(
    "schedules",
    fetchPopularArticle,
  );
  return response;
};

export const fetchArticleByBoardId = (boardId: number) => {
  return caxios.get<res.ArticleByBoardId[]>(`/boards/${boardId}/articles`);
};

export const useArticleByBoardId = (boardId: number) => {
  const response = useQuery<AxiosResponse<res.ArticleByBoardId[]>, Error>(
    [ "articles", boardId ],
    () => fetchArticleByBoardId(boardId),
  );
  return response;
};
