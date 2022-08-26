import { useQuery } from "react-query";

import { AxiosResponse } from "axios";
import dayjs from "dayjs";
import caxios from "src/api/caxios";

const detectHoliday = (schedules: res.Schedule[]) => {
  const day = dayjs().day();
  const isWeekend = day === 6 || day === 0;
  if (isWeekend) return true;
  let isHoliday = false;
  schedules.forEach((schedule) => {
    if (schedule.isHoliday) isHoliday = true;
  });
  return isHoliday;
};

const fetchSchedules = (today: string) => {
  return caxios.get<res.Schedule[]>(`/schedules?startDate=${today}`);
};

export const useSchedule = (today: string) => {
  const response = useQuery<
    AxiosResponse<res.Schedule[]>,
    Error,
    AxiosResponse<res.Schedule[]> & { isHoliday: boolean }
  >(
    "schedule",
    () => {
      return fetchSchedules(today);
    },
    {
      select: (data) => {
        const schedules = data.data;
        const isHoliday = detectHoliday(data.data);
        return { ...data, data: schedules, isHoliday };
      },
    },
  );
  return response;
};
