import { useCoreQuery } from "@hooks/api/core";
import { getSchool, getSchools } from "src/api/school/index";
import { queryKey } from "src/consts/react-query";

export const useSchoolsQuery = () => {
  return useCoreQuery(queryKey.schools, () => {
    return getSchools();
  });
};

export const useSchoolQuery = (placeId: req.School["placeId"]) => {
  return useCoreQuery(queryKey.school(placeId), () => {
    return getSchool(placeId);
  });
};
