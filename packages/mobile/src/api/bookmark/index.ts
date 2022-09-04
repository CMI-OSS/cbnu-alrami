import http from "src/api/core";

export const postArticleBookmark = (articleId: req.Bookmark["articleId"]) => {
  return http.post(`/bookmark/articles/${articleId}`);
};

export const deleteArticleBookmark = (articleId: req.Bookmark["articleId"]) => {
  return http.delete(`/bookmark/articles/${articleId}`);
};

export const getBookmarkSchedules = (): Promise<res.Schedule[]> => {
  return http.get("/bookmark/schedules");
};

export const postScheduleBookmark = (
  scheduleId: req.Bookmark["scheduleId"],
) => {
  return http.post(`/bookmark/schedule/${scheduleId}`);
};

export const deleteScheduleBookmark = (
  scheduleId: req.Bookmark["scheduleId"],
) => {
  return http.delete(`/bookmark/schedule/${scheduleId}`);
};
