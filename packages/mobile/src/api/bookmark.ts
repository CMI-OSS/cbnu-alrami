import { useMutation, useQuery } from "react-query";

import { AxiosResponse } from "axios";
import dayjs, { Dayjs } from "dayjs";
import { queryClient } from "src/main";

import caxios from "./caxios";

type Schedule = Omit<res.Schedule, "startDate" | "endDate"> & {
  startDate: Dayjs;
  endDate: Dayjs | null;
};

const postArticleBookmark = (articleId: number) => {
  return caxios.post(`/bookmark/articles/${articleId}`);
};

export const useAddArticleBookmark = () => {
  return useMutation(
    ({ articleId }: { articleId: number }) => {
      return postArticleBookmark(articleId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([ "article" ]);
      },
    },
  );
};

const deleteArticleBookmark = (articleId: number) => {
  return caxios.delete(`/bookmark/articles/${articleId}`);
};

export const useRemoveArticleBookmark = () => {
  return useMutation(
    ({ articleId }: { articleId: number }) => {
      return deleteArticleBookmark(articleId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([ "article" ]);
      },
    },
  );
};

const fetchBookmarkedSchedules = (uuid: string) => {
  return caxios.get("/bookmark/schedules", {
    headers: {
      uuid,
    },
  });
};

export const useFetchBookmarkedSchedules = (uuid: string) => {
  const response = useQuery<AxiosResponse<res.Schedule[]>, Error, Schedule[]>(
    "bookmarkedSchedule",
    () => {
      return fetchBookmarkedSchedules(uuid);
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

const postScheduleBookmark = (scheduleId: number, uuid: string) => {
  return caxios.post(`/bookmark/schedule/${scheduleId}`, {
    headers: {
      uuid,
    },
  });
};

export const useAddScheduleBookmark = () => {
  return useMutation(
    ({ scheduleId, uuid }: { scheduleId: number; uuid: string }) => {
      return postScheduleBookmark(scheduleId, uuid);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([ "bookmarkedSchedule" ]);
      },
    },
  );
};

const deleteScheduleBookmark = (scheduleId: number, uuid: string) => {
  return caxios.delete(`/bookmark/schedule/${scheduleId}`, {
    headers: {
      uuid,
    },
  });
};

export const useRemoveScheduleBookmark = () => {
  return useMutation(
    ({ scheduleId, uuid }: { scheduleId: number; uuid: string }) => {
      return deleteScheduleBookmark(scheduleId, uuid);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([ "bookmarkedSchedule" ]);
      },
    },
  );
};
