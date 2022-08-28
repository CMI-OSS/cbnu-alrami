import { useQuery } from "react-query";

import { AxiosResponse } from "axios";
import dayjs, { Dayjs } from "dayjs";
import caxios from "src/api/caxios";

type Schedule = Omit<res.Schedule, "startDate" | "endDate"> & {
  startDate: Dayjs;
  endDate: Dayjs | null;
};

const fetchSchedules = (year: number) => {
  return caxios.get<res.Schedule[]>(
    `/schedules?startDate=${year}-01-01&endDate=${year}-12-31`,
  );
};

export const useFetchScheduleCalendar = (year: number) => {
  const response = useQuery<AxiosResponse<res.Schedule[]>, Error, Schedule[]>(
    "schedule",
    () => {
      return fetchSchedules(year);
    },
    {
      select: (data) => {
        const schedules = data.data.map(({ startDate, endDate, ...last }) => {
          return {
            startDate: dayjs(startDate),
            endDate: endDate ? dayjs(endDate) : null,
            ...last,
          };
        });
        return schedules;
      },
    },
  );
  return response;
};
