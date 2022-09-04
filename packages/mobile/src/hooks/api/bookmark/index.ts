import { useCoreMutation, useCoreQuery } from "@hooks/api/core";
import dayjs from "dayjs";
import {
  deleteArticleBookmark,
  deleteScheduleBookmark,
  getBookmarkSchedules,
  postArticleBookmark,
  postScheduleBookmark,
} from "src/api/bookmark";
import { queryKey } from "src/consts/react-query";
import { queryClient } from "src/main";
import { Schedule } from "src/type";

export const useAddArticleBookmarkMutation = (
  articleId: req.Bookmark["articleId"],
) => {
  return useCoreMutation(postArticleBookmark, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey.article(articleId));
    },
  });
};

export const useRemoveArticleBookmarkMutation = (
  articleId: req.Bookmark["articleId"],
) => {
  return useCoreMutation(deleteArticleBookmark, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey.article(articleId));
    },
  });
};

export const useBookmarkSchedulesQuery = () => {
  return useCoreQuery<res.Schedule[], Schedule[]>(
    queryKey.bookmarkSchedules,
    () => {
      return getBookmarkSchedules();
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

export const useAddScheduleBookmarkMutation = () => {
  return useCoreMutation(postScheduleBookmark, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey.bookmarkSchedules);
    },
  });
};

export const useRemoveScheduleBookmarkMutation = () => {
  return useCoreMutation(deleteScheduleBookmark, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey.bookmarkSchedules);
    },
  });
};
