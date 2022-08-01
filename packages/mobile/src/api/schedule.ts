import { useQuery } from "react-query";

import { AxiosResponse } from "axios";
import dayjs from "dayjs";
import caxios from "src/api/caxios";

const fetchSchedules = () => {
  const year = dayjs().year();
  return caxios.get<res.Schedule[]>(
    `/schedules?startDate=${year}-01-01&endDate=${year}-12-31`,
  );
};

export const useSchedule = () => {
  const response = useQuery<AxiosResponse<res.Schedule[]>, Error>(
    "schedule",
    fetchSchedules,
  );
  return response;
};
