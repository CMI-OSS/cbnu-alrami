import { useCoreQuery } from "@hooks/api/core";
import { Weather, WeatherApiService } from "@shared/swagger-api/generated";
import { queryKey } from "src/consts/react-query";

export const useWeathersQuery = () => {
  return useCoreQuery<Weather, Weather>(queryKey.weathers, () => {
    return WeatherApiService.weatherControllerGetWeather();
  });
};
