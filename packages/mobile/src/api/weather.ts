import { useQuery } from "react-query";

import axios from "axios";

const fetchWeathers = () => {
  return axios.get("https://dev-server.cmi.kro.kr/weathers");
};

export const useWeathers = () => {
  const response = useQuery<any, void>("weathers", fetchWeathers);
  return response;
};
