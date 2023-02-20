import { useCoreInfiniteQuery, useCoreQuery } from "@hooks/api/core";
import { BoardApiService } from "@shared/swagger-api/generated";
import { queryKey } from "src/consts/react-query";
import { GetParams } from "src/type/utils";

export const useBoardArticlesQuery = (
  params: GetParams<typeof BoardApiService.boardControllerFindArticlePage>,
) => {
  return useCoreInfiniteQuery(
    queryKey.boardArticles(params.id),
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

export const useBoardQuery = (
  params: GetParams<typeof BoardApiService.boardControllerFind>,
) => {
  return useCoreQuery(queryKey.boardTrees, () => {
    return BoardApiService.boardControllerFind(params);
  });
};

export const useBoardSubscribeQuery = (
  params: GetParams<typeof BoardApiService.boardControllerFindSubscribeBoards>,
) => {
  return useCoreQuery(queryKey.subscribeBoards, () => {
    return BoardApiService.boardControllerFindSubscribeBoards(params);
  });
};
