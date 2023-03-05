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
    queryKey.popularArticles(params),
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
    },
  );
};

export const useSubscribeArticlesQuery = (
  params?: GetParams<
    typeof ArticleApiService.articleControllerFindSubscribeArticle
  >,
) => {
  return useCoreInfiniteQuery(
    queryKey.subscribeArticles({ ...params, uuid }),
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
    },
  );
};

export const useBookmarkArticlesQuery = (
  params?: GetParams<
    typeof ArticleApiService.articleControllerFindBookmarkArticle
  >,
) => {
  return useCoreInfiniteQuery(
    queryKey.bookmarkArticles({ ...params, uuid }),
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
  params: GetParams<typeof ArticleApiService.articleControllerFindOne>,
) => {
  return useCoreQuery(queryKey.article({ ...params, uuid }), () => {
    return ArticleApiService.articleControllerFindOne({ ...params, uuid });
  });
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
        return queryClient.invalidateQueries(
          queryKey.article({ ...params, uuid }),
        );
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
        return queryClient.invalidateQueries(
          queryKey.article({ ...params, uuid }),
        );
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
        return queryClient.invalidateQueries(
          queryKey.article({ ...params, uuid }),
        );
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
        return queryClient.invalidateQueries(
          queryKey.article({ ...params, uuid }),
        );
      },
    },
  );
};
