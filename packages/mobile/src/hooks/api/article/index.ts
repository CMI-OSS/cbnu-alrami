import {
  useCoreInfiniteQuery,
  useCoreMutation,
  useCoreQuery,
} from "@hooks/api/core";
import { ArticleApiService } from "@shared/swagger-api/generated";
import { queryKey } from "src/consts/react-query";
import { queryClient } from "src/main";
import { GetParams } from "src/type/utils";
import { getUuid } from "src/utils/storage";

const uuid = getUuid();

export const usePopularArticlesQuery = (
  params?: GetParams<
    typeof ArticleApiService.articleControllerFindPopularArticles
  >,
) => {
  return useCoreInfiniteQuery(
    queryKey.popularArticles(),
    ({ pageParam = 1 }) => {
      return ArticleApiService.articleControllerFindPopularArticles({
        ...params,
        page: pageParam,
      });
    },
    {
      getNextPageParam: ({ pagination }) => {
        return pagination?.isEnd ? undefined : pagination?.currentPage + 1;
      },
      suspense: true,
    },
  );
};

export const useSubscribeArticlesQuery = (
  params?: GetParams<
    typeof ArticleApiService.articleControllerFindSubscribeArticle
  >,
) => {
  return useCoreInfiniteQuery(
    queryKey.subscribeArticles(),
    ({ pageParam = 1 }) => {
      return ArticleApiService.articleControllerFindSubscribeArticle({
        ...params,
        uuid,
        page: pageParam,
      });
    },
    {
      getNextPageParam: ({ pagination }) => {
        return pagination?.isEnd ? undefined : pagination?.currentPage + 1;
      },
      suspense: true,
    },
  );
};

export const useBookmarkArticlesQuery = (
  params?: GetParams<
    typeof ArticleApiService.articleControllerFindBookmarkArticle
  >,
) => {
  return useCoreInfiniteQuery(
    queryKey.bookmarkArticles(),
    ({ pageParam = 1 }) => {
      return ArticleApiService.articleControllerFindBookmarkArticle({
        ...params,
        uuid,
        page: pageParam,
      });
    },
    {
      getNextPageParam: ({ pagination }) => {
        return pagination?.isEnd ? undefined : pagination?.currentPage + 1;
      },
    },
  );
};

export const useArticleQuery = (
  params: GetParams<typeof ArticleApiService.articleControllerFindOne> & {
    boardId: number;
  },
) => {
  return useCoreQuery(
    queryKey.article({ ...params, uuid }),
    () => {
      return ArticleApiService.articleControllerFindOne({ ...params, uuid });
    },
    {
      staleTime: 5000,
      onSuccess: () => {
        Promise.all([
          queryClient.invalidateQueries(queryKey.popularArticles()),
          queryClient.invalidateQueries(queryKey.subscribeArticles()),
          queryClient.invalidateQueries(queryKey.bookmarkArticles()),
          queryClient.invalidateQueries(
            queryKey.boardArticles({ id: params.boardId }),
          ),
        ]);
      },
    },
  );
};

export const usePostBookmarkArticleMutation = (
  params: GetParams<typeof ArticleApiService.articleControllerFindOne>,
) => {
  return useCoreMutation(
    () => {
      return ArticleApiService.articleControllerBookmark({ ...params, uuid });
    },
    {
      onSuccess: () => {
        Promise.all([
          queryClient.invalidateQueries(queryKey.article({ ...params, uuid })),
          queryClient.invalidateQueries(queryKey.bookmarkArticles()),
        ]);
      },
    },
  );
};

export const useDeleteBookmarkArticleMutation = (
  params: GetParams<typeof ArticleApiService.articleControllerFindOne>,
) => {
  return useCoreMutation(
    () => {
      return ArticleApiService.articleControllerUnbookmark({ ...params, uuid });
    },
    {
      onSuccess: () => {
        Promise.all([
          queryClient.invalidateQueries(queryKey.article({ ...params, uuid })),
          queryClient.invalidateQueries(queryKey.bookmarkArticles()),
        ]);
      },
    },
  );
};

export const usePostLikeArticleMutation = (
  params: GetParams<typeof ArticleApiService.articleControllerFindOne>,
) => {
  return useCoreMutation(
    () => {
      return ArticleApiService.articleControllerLike({ ...params, uuid });
    },
    {
      onSuccess: () => {
        Promise.all([
          queryClient.invalidateQueries(queryKey.article({ ...params, uuid })),
          queryClient.invalidateQueries(queryKey.popularArticles()),
          queryClient.invalidateQueries(queryKey.subscribeArticles()),
          queryClient.invalidateQueries(queryKey.bookmarkArticles()),
        ]);
      },
    },
  );
};

export const useDeleteLikeArticleMutation = (
  params: GetParams<typeof ArticleApiService.articleControllerFindOne>,
) => {
  return useCoreMutation(
    () => {
      return ArticleApiService.articleControllerUndoLike({ ...params, uuid });
    },
    {
      onSuccess: () => {
        Promise.all([
          queryClient.invalidateQueries(queryKey.article({ ...params, uuid })),
          queryClient.invalidateQueries(queryKey.popularArticles()),
          queryClient.invalidateQueries(queryKey.subscribeArticles()),
          queryClient.invalidateQueries(queryKey.bookmarkArticles()),
        ]);
      },
    },
  );
};
