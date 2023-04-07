import { useCoreMutation, useCoreQuery } from "@hooks/api/core";
import {
  MutationResponse,
  Schedule,
  ScheduleApiService,
} from "@shared/swagger-api/generated";
import dayjs, { Dayjs } from "dayjs";
import { queryKey } from "src/consts/react-query/queryKey";
import { queryClient } from "src/main";
import { GetParams } from "src/type/utils";
import { getUuid } from "src/utils/storage";

export type FormattedSchedule = Omit<
  Schedule,
  "startDateTime" | "endDateTime"
> & {
  startDateTime: Dayjs;
  endDateTime: Dayjs | null;
};

const detectHoliday = (schedules: Schedule[]) => {
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

export const useTodaySchedulesQuery = (
  today: GetParams<
    typeof ScheduleApiService.scheduleControllerFindAll
  >["startDateTime"],
) => {
  return useCoreQuery<
    Schedule[],
    { schedules: Schedule[]; isHoliday: boolean }
  >(
    queryKey.todaysSchedules,
    () => {
      return ScheduleApiService.scheduleControllerFindAll({
        startDateTime: today,
        endDateTime: today,
      });
    },
    {
      select: (data) => {
        const schedules = data;
        const isHoliday = detectHoliday(data);
        return { schedules, isHoliday };
      },
      suspense: true,
    },
  );
};

export const useBookmarkSchedulesQuery = () => {
  return useCoreQuery<Schedule[], FormattedSchedule[]>(
    queryKey.bookmarkSchedules,
    () => {
      return ScheduleApiService.scheduleControllerFindBookmarkSchedule({
        uuid: getUuid(),
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
  return useCoreMutation<
    MutationResponse,
    GetParams<typeof ScheduleApiService.scheduleControllerBookmark>
  >(
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
  return useCoreMutation<
    MutationResponse,
    GetParams<typeof ScheduleApiService.scheduleControllerBookmark>
  >(
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
