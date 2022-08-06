import { useQuery } from "react-query";

import { AxiosResponse } from "axios";
import caxios from "src/api/caxios";

const fetchSchool = () => {
  return caxios.get<res.School[]>("/places/school");
};

export const useSchool = () => {
  const response = useQuery<AxiosResponse<res.School[]>, Error>(
    "school",
    fetchSchool,
  );
  console.log(response);
  return response;
};
