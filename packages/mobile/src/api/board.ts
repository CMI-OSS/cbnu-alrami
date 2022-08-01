
import { useQuery } from "react-query";

import { AxiosResponse } from "axios";
import caxios from "src/api/caxios";

export const fetchArticleByBoard = (boardId: number) => {
  return caxios.get<res.ArticleByBoard[]>(`/boards/${boardId}/articles`);
};

export const useArticleByBoard = (boardId: number) => {
  const response = useQuery<AxiosResponse<res.ArticleByBoard[]>, Error>(
    [ "articles", boardId ],
    () => fetchArticleByBoard(boardId),
  );
  return response;
};
