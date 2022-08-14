import { useMutation, useQuery } from "react-query";

import { AxiosResponse } from "axios";
import caxios from "src/api/caxios";
import { queryClient } from "src/main";

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
            ? `${category.parents[0].name} > ${category.name}`
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

export const useAddSubscribe = () => {
  return useMutation(
    ({ boardId }: { boardId: number }) => {
      return postSubscribeBoard(boardId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([ "boardTree", "subscribeBoards" ]);
      },
    },
  );
};

const deleteSubscribeBoard = (boardId: number) => {
  return caxios.delete(`/subscribe/boards/${boardId}`);
};

export const useRemoveSubscribe = () => {
  return useMutation(
    ({ boardId }: { boardId: number }) => {
      return deleteSubscribeBoard(boardId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([ "boardTree", "subscribeBoards" ]);
      },
    },
  );
};

const postNoticeBoard = (boardId: number) => {
  return caxios.post(`/notice/boards/${boardId}`);
};

export const useAddAlarm = () => {
  return useMutation(
    ({ boardId }: { boardId: number }) => {
      return postNoticeBoard(boardId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([ "boardTree", "subscribeBoards" ]);
      },
    },
  );
};

const deleteNoticeBoard = (boardId: number) => {
  return caxios.delete(`/notice/boards/${boardId}`);
};

export const useRemoveAlarm = () => {
  return useMutation(
    ({ boardId }: { boardId: number }) => {
      return deleteNoticeBoard(boardId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([ "boardTree", "subscribeBoards" ]);
      },
    },
  );
};
