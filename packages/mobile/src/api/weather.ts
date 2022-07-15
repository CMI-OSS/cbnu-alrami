import { useQuery } from "react-query";

import caxios from "src/api/caxios";

const fetchWeathers = () => {
  return caxios.get("/weathers");
};

export const useWeathers = () => {
  const response = useQuery<any, void>("weathers", fetchWeathers);
  return response;
};
