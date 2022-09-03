import { useCoreMutation, useCoreQuery } from "@hooks/api/core";
import {
  deleteNoticeBoard,
  deleteSubscribeBoard,
  getSubscribeBoards,
  postNoticeBoard,
  postSubscribeBoard,
} from "src/api/subscribe/index";
import { queryKey } from "src/consts/react-query";
import { queryClient } from "src/main";

export const useSubscribeBoardsQuery = () => {
  return useCoreQuery<res.SubscriptionBoard[]>(
    queryKey.subscribeBoards,
    () => {
      return getSubscribeBoards();
    },
    {
      select: (data) => {
        return data.map((category) => {
          return {
            ...category,
            name: category.parents.length
              ? `${category.parents[0].name} > ${category.name}`
              : category.name,
          };
        });
      },
    },
  );
};

export const useAddSubscribeMutation = () => {
  return useCoreMutation(postSubscribeBoard, {
    onSuccess: (boardId: req.BoardTree["boardId"]) => {
      queryClient.invalidateQueries(queryKey.subscribeBoards);
    },
  });
};

export const useRemoveSubscribeMutation = () => {
  return useCoreMutation(deleteSubscribeBoard, {
    onSuccess: (boardId: req.BoardTree["boardId"]) => {
      queryClient.invalidateQueries(queryKey.subscribeBoards);
    },
  });
};

export const useAddAlarmMutation = () => {
  return useCoreMutation(postNoticeBoard, {
    onSuccess: (boardId: req.BoardTree["boardId"]) => {
      queryClient.invalidateQueries(queryKey.subscribeBoards);
    },
  });
};

export const useRemoveAlarmMutation = () => {
  return useCoreMutation(deleteNoticeBoard, {
    onSuccess: (boardId: req.BoardTree["boardId"]) => {
      queryClient.invalidateQueries(queryKey.subscribeBoards);
    },
  });
};
