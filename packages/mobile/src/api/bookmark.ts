import { useMutation, useQuery } from "react-query";

import { AxiosResponse } from "axios";
import dayjs from "dayjs";
import { queryClient } from "src/main";
import { Schedule } from "src/type";

import caxios from "./caxios";

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

const fetchBookmarkedSchedules = () => {
  return caxios.get("/bookmark/schedules");
};

export const useFetchBookmarkedSchedules = () => {
  const response = useQuery<AxiosResponse<res.Schedule[]>, Error, Schedule[]>(
    "bookmarkedSchedule",
    () => {
      return fetchBookmarkedSchedules();
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

const postScheduleBookmark = (scheduleId: number) => {
  return caxios.post(`/bookmark/schedule/${scheduleId}`);
};

export const useAddScheduleBookmark = () => {
  return useMutation(
    ({ scheduleId }: { scheduleId: number }) => {
      return postScheduleBookmark(scheduleId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([ "bookmarkedSchedule" ]);
      },
    },
  );
};

const deleteScheduleBookmark = (scheduleId: number) => {
  return caxios.delete(`/bookmark/schedule/${scheduleId}`);
};

export const useRemoveScheduleBookmark = () => {
  return useMutation(
    ({ scheduleId }: { scheduleId: number }) => {
      return deleteScheduleBookmark(scheduleId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([ "bookmarkedSchedule" ]);
      },
    },
  );
};
