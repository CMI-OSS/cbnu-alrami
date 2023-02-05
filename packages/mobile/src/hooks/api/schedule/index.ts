import { useCoreMutation, useCoreQuery } from "@hooks/api/core";
import {
  MutationResponse,
  Schedule,
  ScheduleApiService,
} from "@shared/swagger-api/generated";
import dayjs, { Dayjs } from "dayjs";
import { getTodaySchedules } from "src/api/schedule";
import { queryKey } from "src/consts/react-query";
import { queryClient } from "src/main";

export type FormattedSchedule = Omit<
  Schedule,
  "startDateTime" | "endDateTime"
> & {
  startDateTime: Dayjs;
  endDateTime: Dayjs | null;
};

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

export const useFullSchedulesQuery = (year: number) => {
  return useCoreQuery<Schedule[], FormattedSchedule[]>(
    queryKey.schedules,
    () => {
      return ScheduleApiService.scheduleControllerFindAll({
        startDateTime: `${year}-01-01`,
        endDateTime: `${year}-12-31`,
      });
    },
    {
      select: (data) => {
        const schedules = data.map(
          ({ startDateTime, endDateTime, ...last }) => {
            return {
              startDateTime: dayjs(startDateTime),
              endDateTime: endDateTime ? dayjs(endDateTime) : null,
              ...last,
            };
          },
        );
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

export const useBookmarkSchedulesQuery = (uuid?: string) => {
  return useCoreQuery<Schedule[], FormattedSchedule[]>(
    queryKey.bookmarkSchedules,
    () => {
      return ScheduleApiService.scheduleControllerFindBookmarkSchedule({
        uuid,
      });
    },
    {
      select: (data) => {
        const schedules = data.map(
          ({ startDateTime, endDateTime, ...last }) => {
            return {
              startDateTime: dayjs(startDateTime),
              endDateTime: endDateTime ? dayjs(endDateTime) : null,
              ...last,
            };
          },
        );
        return schedules;
      },
    },
  );
};

export const useAddScheduleBookmarkMutation = () => {
  return useCoreMutation<MutationResponse, { id: number; uuid?: string }>(
    ({ id, uuid }) => {
      return ScheduleApiService.scheduleControllerBookmark({ id, uuid });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey.bookmarkSchedules);
      },
    },
  );
};

export const useRemoveScheduleBookmarkMutation = () => {
  return useCoreMutation<MutationResponse, { id: number; uuid?: string }>(
    ({ id, uuid }) => {
      return ScheduleApiService.scheduleControllerUnbookmark({ id, uuid });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey.bookmarkSchedules);
      },
    },
  );
};
