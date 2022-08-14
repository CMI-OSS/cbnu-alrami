import { useQuery } from "react-query";

import { AxiosResponse } from "axios";
import caxios from "src/api/caxios";

const fetchSchool = () => {
  return caxios.get<res.School[]>("/places/school");
};

const fetchSchoolById = (placeId: number) => {
  return caxios.get<res.SchoolById>(`/places/school/${placeId}`);
};

export const useSchool = () => {
  const response = useQuery<AxiosResponse<res.School[]>, Error>(
    "school",
    fetchSchool,
  );
  return response;
};

export const useSchoolById = (placeId: number) => {
  const response = useQuery<AxiosResponse<res.SchoolById>, Error>(
    [ "schoolId", placeId ],
    () => {
      return fetchSchoolById(placeId);
    },
  );
  return response;
};
