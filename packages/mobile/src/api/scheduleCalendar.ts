import { useQuery } from "react-query";

import { AxiosResponse } from "axios";
import caxios from "src/api/caxios";

const fetchSchedules = (year: number) => {
  return caxios.get<res.Schedule[]>(
    `/schedules?startDate=${year}-01-01&endDate=${year}-12-31`,
  );
};

export const useScheduleCalendar = (year: number) => {
  const response = useQuery<AxiosResponse<res.Schedule[]>, Error>(
    "schedule",
    () => fetchSchedules(year),
  );
  return response;
};
