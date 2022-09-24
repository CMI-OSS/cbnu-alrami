import { useCoreQuery } from "@hooks/api/core";
import { getWeathers } from "src/api/weather";
import { queryKey } from "src/consts/react-query";

export const useWeathersQuery = () => {
  return useCoreQuery(queryKey.weathers, () => {
    return getWeathers();
  });
};
