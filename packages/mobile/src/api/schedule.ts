import { useQuery } from "react-query";

import { AxiosResponse } from "axios";
import caxios from "src/api/caxios";

const fetchSchedules = (today: string) => {
  return caxios.get<res.Schedule[]>(`/schedules?startDate=${today}`);
};

export const useSchedule = (today: string) => {
  const response = useQuery<AxiosResponse<res.Schedule[]>, Error>(
    "schedule",
    () => {
      return fetchSchedules(today);
    },
  );
  return response;
};
