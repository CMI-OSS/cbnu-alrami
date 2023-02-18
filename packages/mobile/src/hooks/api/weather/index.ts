import { useCoreQuery } from "@hooks/api/core";
import { WeatherApiService } from "@shared/swagger-api/generated";
import { queryKey } from "src/consts/react-query";

export const useWeathersQuery = () => {
  return useCoreQuery(queryKey.weathers, () => {
    return WeatherApiService.weatherControllerGetWeather();
  });
};
