import { useQuery } from "react-query";

import { AxiosResponse } from "axios";
import dayjs from "dayjs";
import caxios from "src/api/caxios";
import { Schedule } from "src/type";

const detectHoliday = (schedules: res.Schedule[]) => {
  const day = dayjs().day();
  const isWeekend = day === 6 || day === 0;
  if (isWeekend) return true;
  let isHoliday = false;
  for (let i = 0; i < schedules.length; i += 1)
    if (schedules[i].isHoliday) {
      isHoliday = true;
      break;
    }
  return isHoliday;
};

const fetchFullSchedules = (year: number) => {
  return caxios.get<res.Schedule[]>(
    `/schedules?startDate=${year}-01-01&endDate=${year}-12-31`,
  );
};

export const useFetchFullSchedules = (year: number) => {
  const response = useQuery<AxiosResponse<res.Schedule[]>, Error, Schedule[]>(
    "schedule",
    () => {
      return fetchFullSchedules(year);
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
  return { ...response, data: response.data || [] };
};

const fetchTodaysSchedules = (today: string) => {
  return caxios.get<res.Schedule[]>(`/schedules?startDate=${today}`);
};

export const useFetchTodaysSchedules = (today: string) => {
  const response = useQuery<
    AxiosResponse<res.Schedule[]>,
    Error,
    { schedules: res.Schedule[]; isHoliday: boolean }
  >(
    "schedule",
    () => {
      return fetchTodaysSchedules(today);
    },
    {
      select: (data) => {
        const schedules = data.data;
        const isHoliday = detectHoliday(data.data);
        return { schedules, isHoliday };
      },
    },
  );
  return response;
};
