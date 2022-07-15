import { useQuery } from "react-query";

import { AxiosResponse } from "axios";
import caxios from "src/api/caxios";

const fetchWeathers = () => {
  return caxios.get<res.Weather>("/weathers");
};

export const useWeathers = () => {
  const response = useQuery<AxiosResponse<res.Weather>, Error>(
    "weathers",
    fetchWeathers,
  );
  return response;
};
