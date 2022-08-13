import { useQuery } from "react-query";

import { AxiosResponse } from "axios";
import caxios from "src/api/caxios";

const getSubscribeBoards = () => {
  return caxios.get<res.SubscriptionBoard[]>("/subscribe/boards/info");
};

export const useSubscribeBoards = () => {
  const response = useQuery<
    AxiosResponse<res.SubscriptionBoard[]>,
    Error,
    res.SubscriptionBoard[]
  >("subscribeBoards", getSubscribeBoards, {
    select: (data) => {
      return data.data.map((category) => {
        return {
          ...category,
          name: category.parents.length
            ? `${category.parents[0].name} - ${category.name}`
            : category.name,
        };
      });
    },
  });
  return response;
};

const postSubscribeBoard = (boardId: number) => {
  return caxios.post(`/subscribe/boards/${boardId}`);
};

export const useAddSubscribe = (boardId: number) => {
  return postSubscribeBoard(boardId);
};

const deleteSubscribeBoard = (boardId: number) => {
  return caxios.delete(`/subscribe/boards/${boardId}`);
};

export const useRemoveSubscribe = (boardId: number) => {
  return deleteSubscribeBoard(boardId);
};

const postNoticeBoard = (boardId: number) => {
  return caxios.post(`/notice/boards/${boardId}`);
};

export const useAddNotice = (boardId: number) => {
  return postNoticeBoard(boardId);
};

const deleteNoticeBoard = (boardId: number) => {
  return caxios.delete(`/notice/boards/${boardId}`);
};

export const useRemoveNotice = (boardId: number) => {
  return deleteNoticeBoard(boardId);
};
