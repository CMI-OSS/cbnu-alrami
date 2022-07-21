import { useQuery } from "react-query";

import { AxiosResponse } from "axios";
import caxios from "src/api/caxios";

const fetchBoardTree = () => {
  return caxios.get<res.Popular[]>("/board-tree");
};

export const usePopularArticle = () => {
  const response = useQuery<AxiosResponse<res.Popular[]>, Error>(
    "boardTree",
    fetchBoardTree,
  );
  return response;
};
