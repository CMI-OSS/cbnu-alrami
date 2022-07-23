import { useQuery } from "react-query";

import { AxiosResponse } from "axios";
import caxios from "src/api/caxios";

const fetchSchedules = () => {
  return caxios.get<res.Schedule[]>("/schedules?startDate=2022-01-01");
};

export const useSchedule = () => {
  const response = useQuery<AxiosResponse<res.Schedule[]>, Error>(
    "schedule",
    fetchSchedules,
  );
  return response;
};
