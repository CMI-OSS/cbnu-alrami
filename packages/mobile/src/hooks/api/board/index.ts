import {
  useCoreInfiniteQuery,
  useCoreMutation,
  useCoreQuery,
} from "@hooks/api/core";
import { BoardApiService } from "@shared/swagger-api/generated";
import { queryKey } from "src/consts/react-query";
import { queryClient } from "src/main";
import { GetParams } from "src/type/utils";

export const useBoardArticlesQuery = (
  params: GetParams<typeof BoardApiService.boardControllerFindArticlePage>,
) => {
  return useCoreInfiniteQuery(
    queryKey.boardArticles(params),
    ({ pageParam = 1 }) => {
      return BoardApiService.boardControllerFindArticlePage({
        page: pageParam,
        ...params,
      });
    },
    {
      getNextPageParam: ({ pagination: { isEnd, currentPage } }) => {
        return isEnd ? undefined : currentPage + 1;
      },
    },
  );
};

export const useSubscribeBoardsQuery = (
  params: GetParams<typeof BoardApiService.boardControllerFindSubscribeBoards>,
) => {
  return useCoreQuery(
    queryKey.subscribeBoards,
    () => {
      return BoardApiService.boardControllerFindSubscribeBoards(params);
    },
    {
      select: (data) => {
        const nextData = data.map((indiData) => {
          const { name, parent } = indiData;
          return {
            ...indiData,
            combinedName: parent?.name ? `${parent?.name} > ${name}` : name,
          };
        });
        return nextData;
      },
    },
  );
};

export const useBoardsQuery = (
  params: GetParams<typeof BoardApiService.boardControllerFind>,
) => {
  return useCoreQuery(queryKey.boards(params), () => {
    return BoardApiService.boardControllerFind(params);
  });
};

export const useBoardQuery = (
  params: GetParams<typeof BoardApiService.boardControllerFindOne>,
) => {
  return useCoreQuery(queryKey.board(params), () => {
    return BoardApiService.boardControllerFindOne(params);
  });
};

export const useSubscribeBoardMutation = (
  params: GetParams<typeof BoardApiService.boardControllerFindOne>,
) => {
  return useCoreMutation(BoardApiService.boardControllerSubscribe, {
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries(queryKey.subscribeBoards),
        queryClient.invalidateQueries(queryKey.board(params)),
      ]);
    },
  });
};

export const useUnSubscribeBoardMutation = (
  params: GetParams<typeof BoardApiService.boardControllerFindOne>,
) => {
  return useCoreMutation(BoardApiService.boardControllerUnsubscribe, {
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries(queryKey.subscribeBoards),
        queryClient.invalidateQueries(queryKey.board(params)),
      ]);
    },
  });
};

export const useNoticeBoardMutation = (
  params: GetParams<typeof BoardApiService.boardControllerFindOne>,
) => {
  return useCoreMutation(BoardApiService.boardControllerNotice, {
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries(queryKey.subscribeBoards),
        queryClient.invalidateQueries(queryKey.board(params)),
      ]);
    },
  });
};

export const useUnNoticeBoardMutation = (
  params: GetParams<typeof BoardApiService.boardControllerFindOne>,
) => {
  return useCoreMutation(BoardApiService.boardControllerUnnotice, {
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries(queryKey.subscribeBoards),
        queryClient.invalidateQueries(queryKey.board(params)),
      ]);
    },
  });
};
