import { useCoreQuery } from "@hooks/api/core";
import { PlaceApiService } from "@shared/swagger-api/generated";
import { queryKey } from "src/consts/react-query";
import { GetParams } from "src/type/utils";

export const useSchoolQuery = (params?: GetParams<typeof PlaceApiService.placeControllerFindSchool>) => {
  return useCoreQuery(queryKey.schools({...params}), () => {
    return PlaceApiService.placeControllerFindSchool({
      ...params
    })
  })
};

export const useSchoolQuery = (placeId: GetParams<typeof PlaceApiService.placeControllerFindOneSchool>["id"]) => {
  return useCoreQuery(queryKey.school(placeId), () => {
    return PlaceApiService.placeControllerFindOneSchool({
      id: placeId
    })
  });
};
