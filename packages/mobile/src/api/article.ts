import { useQuery } from "react-query";

import caxios from "src/api/caxios";

const fetchPopularArticle = () => {
  return caxios.get("/articles/popular");
};

export const usePopularArticle = () => {
  const response = useQuery<any, void>("schedules", fetchPopularArticle);
  return response;
};
