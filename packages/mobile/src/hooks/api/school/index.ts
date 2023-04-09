import { useCoreQuery } from "@hooks/api/core";
import { PlaceApiService } from "@shared/swagger-api/generated";
import { queryKey } from "src/consts/react-query/queryKey";
import { GetParams } from "src/type/utils";

export const useSchoolsQuery = (
  params?: GetParams<typeof PlaceApiService.placeControllerFindSchool>,
) => {
  return useCoreQuery(queryKey.schools({ ...params }), () => {
    return PlaceApiService.placeControllerFindSchool({
      ...params,
    });
  });
};

export const useSchoolQuery = (
  params: GetParams<typeof PlaceApiService.placeControllerFindOneSchool>,
) => {
  return useCoreQuery(queryKey.school(params), () => {
    return PlaceApiService.placeControllerFindOneSchool({ ...params });
  });
};
