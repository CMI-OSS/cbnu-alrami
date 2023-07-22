import {
  CustomQueryOptions,
  useCoreMutation,
  useCoreQuery,
} from "@hooks/api/core";
import {
  MutationResponse,
  PartialSchdule,
  Schedule,
  ScheduleApiService,
} from "@shared/swagger-api/generated";
import dayjs, { Dayjs } from "dayjs";
import { queryKey } from "src/consts/react-query/queryKey";
import { staleTime } from "src/consts/react-query/staleTime";
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

export const fullScheduleQuery = (
  year: number,
): CustomQueryOptions<Schedule[], FormattedSchedule[]> => {
  return {
    queryKey: queryKey.schedules,
    queryFn: () => {
      return ScheduleApiService.scheduleControllerFindAll({
        startDateTime: `${year}-01-01`,
        endDateTime: `${year}-12-31`,
      });
    },
    suspense: true,
    select: (data) => {
      const schedules = data.map(({ startDateTime, endDateTime, ...last }) => {
        return {
          startDateTime: dayjs(startDateTime),
          endDateTime: endDateTime ? dayjs(endDateTime) : null,
          ...last,
        };
      });
      return schedules;
    },
  };
};

export const useFullSchedulesQuery = (year: number) => {
  const { queryKey, queryFn, ...rest } = fullScheduleQuery(year);
  return useCoreQuery<Schedule[], FormattedSchedule[]>(queryKey, queryFn, rest);
};

export const useTodaySchedulesQuery = (
  today: GetParams<
    typeof ScheduleApiService.scheduleControllerFindAll
  >["startDateTime"],
) => {
  return useCoreQuery<Schedule[], { schedules: Schedule[] }>(
    queryKey.todaysSchedules,
    () => {
      return ScheduleApiService.scheduleControllerFindAll({
        startDateTime: today,
        endDateTime: today,
      });
    },
    {
      select: (data) => {
        return { schedules: data };
      },
      suspense: true,
    },
  );
};

export const useMonthSchedulesQuery = (year: number, month: number) => {
  const firstDayOfMonth = dayjs()
    .year(year)
    .month(month - 1)
    .date(1);

  const lastDayOfMonth = firstDayOfMonth.endOf("month");

  return useCoreQuery<Schedule[], FormattedSchedule[]>(
    [ ...queryKey.monthSchedules, year, month ],
    () => {
      return ScheduleApiService.scheduleControllerFindAll({
        startDateTime: firstDayOfMonth.format("YYYY-MM-DD"),
        endDateTime: lastDayOfMonth.format("YYYY-MM-DD"),
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
      suspense: true,
    },
  );
};

export const bookmarkScheduleQuery: CustomQueryOptions<
  Schedule[],
  FormattedSchedule[]
> = {
  queryKey: queryKey.bookmarkSchedules,
  queryFn: () => {
    return ScheduleApiService.scheduleControllerFindBookmarkSchedule({
      uuid: getUuid(),
    });
  },
  suspense: true,
  select: (data) => {
    const schedules = data.map(({ startDateTime, endDateTime, ...last }) => {
      return {
        startDateTime: dayjs(startDateTime),
        endDateTime: endDateTime ? dayjs(endDateTime) : null,
        ...last,
      };
    });
    return schedules;
  },
};

export const useBookmarkSchedulesQuery = () => {
  const { queryKey, queryFn, ...rest } = bookmarkScheduleQuery;
  return useCoreQuery<Schedule[], FormattedSchedule[]>(queryKey, queryFn, rest);
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

export const holidayQuery = (
  date: string,
): CustomQueryOptions<PartialSchdule, PartialSchdule["isHoliday"]> => {
  return {
    queryKey: queryKey.holiday,
    queryFn: () => {
      return ScheduleApiService.scheduleControllerIsHoliday({
        date,
      });
    },
    suspense: true,
    staleTime: staleTime.MIN_10,
    cacheTime: staleTime.MIN_10,
    select: ({ isHoliday }) => {
      const day = dayjs(date).day();
      const weekend = day === 6 || day === 0;
      return isHoliday || weekend;
    },
  };
};

export const useHoliday = (date: string) => {
  const { queryKey, queryFn, ...rest } = holidayQuery(date);
  return useCoreQuery<PartialSchdule, PartialSchdule["isHoliday"]>(
    queryKey,
    queryFn,
    rest,
  );
};
