import { useCoreQuery } from "@hooks/api/core";
import { PlaceApiService } from "@shared/swagger-api/generated";
import { queryKey } from "src/consts/react-query";
import { GetParams } from "src/type/utils";

export const useSchoolsQuery = () => {
  return useCoreQuery(queryKey.schools, () => {
    return PlaceApiService.placeControllerFindSchool({})
  })
};

export const useSchoolQuery = (placeId: GetParams<typeof PlaceApiService.placeControllerFindOneSchool>["id"]) => {
  return useCoreQuery(queryKey.school(placeId), () => {
    return PlaceApiService.placeControllerFindOneSchool({
      id: placeId
    })
  });
};

export const useSchoolAreaQuery = (position: GetParams<typeof PlaceApiService.placeControllerFindSchool>["area"]) => {
  return useCoreQuery(queryKey.schools, () => {
    return PlaceApiService.placeControllerFindSchool({
      area: position
    })
  })
}
