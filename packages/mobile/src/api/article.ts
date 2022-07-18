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
