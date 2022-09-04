import { useCoreQuery } from "@hooks/api/core";
import dayjs from "dayjs";
import { getFullSchedules, getTodaySchedules } from "src/api/schedule/index";
import { queryKey } from "src/consts/react-query";
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

export const useFullSchedulesQuery = (year: req.Schedule["year"]) => {
  return useCoreQuery<res.Schedule[], Schedule[]>(
    queryKey.schedules,
    () => {
      return getFullSchedules(year);
    },
    {
      select: (data) => {
        const schedules = data.map(({ startDate, endDate, ...last }) => {
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
};

export const useTodaySchedulesQuery = (today: req.Schedule["today"]) => {
  return useCoreQuery<
    res.Schedule[],
    { schedules: res.Schedule[]; isHoliday: boolean }
  >(
    queryKey.schedules,
    () => {
      return getTodaySchedules(today);
    },
    {
      select: (data) => {
        const schedules = data;
        const isHoliday = detectHoliday(data);
        return { schedules, isHoliday };
      },
    },
  );
};
