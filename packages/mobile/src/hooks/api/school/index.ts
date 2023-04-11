import { CustomQueryOptions, useCoreQuery } from "@hooks/api/core";
import { PlaceApiService, PlaceSchoolDto } from "@shared/swagger-api/generated";
import { queryKey } from "src/consts/react-query/queryKey";
import { GetParams } from "src/type/utils";

export const useSchoolsQuery = (
  params?: GetParams<typeof PlaceApiService.placeControllerFindSchool>,
  options?:
    | Omit<CustomQueryOptions<PlaceSchoolDto[], null>, "queryKey" | "queryFn">
    | undefined,
) => {
  return useCoreQuery(
    queryKey.schools({ ...params }),
    () => {
      return PlaceApiService.placeControllerFindSchool({
        ...params,
      });
    },
    options,
  );
};

export const useSchoolQuery = (
  params: GetParams<typeof PlaceApiService.placeControllerFindOneSchool>,
) => {
  return useCoreQuery(queryKey.school(params), () => {
    return PlaceApiService.placeControllerFindOneSchool({ ...params });
  });
};
