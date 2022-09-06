import http from "src/api/core";

export const getSubscribeBoards = (): Promise<res.SubscriptionBoard[]> => {
  return http.get("/subscribe/boards/info");
};

export const postSubscribeBoard = (boardId: req.Subscribe["boardId"]) => {
  return http.post(`/subscribe/boards/${boardId}`);
};

export const deleteSubscribeBoard = (boardId: req.Subscribe["boardId"]) => {
  return http.delete(`/subscribe/boards/${boardId}`);
};

export const postNoticeBoard = (boardId: req.Subscribe["boardId"]) => {
  return http.post(`/notice/boards/${boardId}`);
};

export const deleteNoticeBoard = (boardId: req.Subscribe["boardId"]) => {
  return http.delete(`/notice/boards/${boardId}`);
};
