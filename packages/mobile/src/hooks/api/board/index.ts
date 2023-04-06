import {
  useCoreInfiniteQuery,
  useCoreMutation,
  useCoreQuery,
} from "@hooks/api/core";
import { BoardApiService } from "@shared/swagger-api/generated";
import { queryKey } from "src/consts/react-query";
import { queryClient } from "src/main";
import { GetParams } from "src/type/utils";
import { getUuid } from "src/utils/storage";
import { toastSuccess } from "src/utils/toast";

const uuid = getUuid();

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

export const useSubscribeBoardsQuery = () => {
  return useCoreQuery(
    queryKey.subscribeBoards,
    () => {
      return BoardApiService.boardControllerFindSubscribeBoards({ uuid });
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

export const useBoardsQuery = () => {
  return useCoreQuery(
    queryKey.boards({ uuid }),
    () => {
      return BoardApiService.boardControllerFind({ uuid });
    },
    { staleTime: 300000 },
  );
};

export const useBoardQuery = (
  params: GetParams<typeof BoardApiService.boardControllerFindOne>,
) => {
  return useCoreQuery(queryKey.board({ ...params, uuid }), () => {
    return BoardApiService.boardControllerFindOne({ ...params, uuid });
  });
};

export const useSubscribeBoardMutation = (
  params: GetParams<typeof BoardApiService.boardControllerFindOne>,
) => {
  return useCoreMutation(
    () => {
      return BoardApiService.boardControllerSubscribe({ ...params, uuid });
    },
    {
      onSuccess: () => {
        Promise.all([
          queryClient.invalidateQueries(queryKey.subscribeBoards),
          queryClient.invalidateQueries(queryKey.board({ ...params, uuid })),
          queryClient.invalidateQueries(queryKey.subscribeArticles({ uuid })),
        ]);
        toastSuccess({
          message: "구독이 추가되었습니다.",
        });
      },
    },
  );
};

export const useUnSubscribeBoardMutation = (
  params: GetParams<typeof BoardApiService.boardControllerFindOne>,
) => {
  return useCoreMutation(
    () => {
      return BoardApiService.boardControllerUnsubscribe({ ...params, uuid });
    },
    {
      onSuccess: () => {
        Promise.all([
          queryClient.invalidateQueries(queryKey.subscribeBoards),
          queryClient.invalidateQueries(queryKey.board({ ...params, uuid })),
          queryClient.invalidateQueries(queryKey.subscribeArticles({ uuid })),
        ]);
        toastSuccess({
          message: "구독이 해제되었습니다.",
        });
      },
    },
  );
};

export const useNoticeBoardMutation = (
  params: GetParams<typeof BoardApiService.boardControllerFindOne>,
) => {
  return useCoreMutation(
    () => {
      return BoardApiService.boardControllerNotice({ ...params, uuid });
    },
    {
      onSuccess: () => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: queryKey.subscribeBoards,
          }),
          queryClient.invalidateQueries({
            queryKey: queryKey.board({ ...params, uuid }),
          }),
        ]);
        toastSuccess({
          message: "알림이 설정되었습니다.",
        });
      },
    },
  );
};

export const useUnNoticeBoardMutation = (
  params: GetParams<typeof BoardApiService.boardControllerFindOne>,
) => {
  return useCoreMutation(
    () => {
      return BoardApiService.boardControllerUnnotice({ ...params, uuid });
    },
    {
      onSuccess: () => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: queryKey.subscribeBoards,
          }),
          queryClient.invalidateQueries({
            queryKey: queryKey.board({ ...params, uuid }),
          }),
        ]);
        toastSuccess({
          message: "알림이 해제되었습니다.",
        });
      },
    },
  );
};
