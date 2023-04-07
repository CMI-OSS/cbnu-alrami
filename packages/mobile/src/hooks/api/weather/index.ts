import { useCoreQuery } from "@hooks/api/core";
import { WeatherApiService } from "@shared/swagger-api/generated";
import { queryKey } from "src/consts/react-query/queryKey";

const roundToOneDecimal = (num?: number) => {
  if (!num) return 0;
  return Math.round(num * 10) / 10;
};

export const useWeathersQuery = () => {
  return useCoreQuery(
    queryKey.weathers,
    () => {
      return WeatherApiService.weatherControllerGetWeather();
    },
    {
      select: (data) => {
        return {
          ...data,
          currentTemp: roundToOneDecimal(data.currentTemp),
          maxTemp: roundToOneDecimal(data.maxTemp),
          minTemp: roundToOneDecimal(data.minTemp),
        };
      },
      suspense: true,
    },
  );
};
