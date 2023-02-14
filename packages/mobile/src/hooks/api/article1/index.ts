import { useCoreInfiniteQuery } from "@hooks/api/core";
import {
  ArticleApiService,
  ResponseArticlePageDto,
} from "@shared/swagger-api/generated";
import { queryKey } from "src/consts/react-query";
import { GetParams } from "src/type/utils";

export const usePopularArticlesQuery = (
  params?: GetParams<
    typeof ArticleApiService.articleControllerFindPopularArticles
  >,
) => {
  return useCoreInfiniteQuery<ResponseArticlePageDto>(
    queryKey.popularArticles,
    ({ pageParam = 1 }) => {
      return ArticleApiService.articleControllerFindPopularArticles({
        ...params,
        page: pageParam,
      });
    },
    {
      getNextPageParam: ({ pagination: { isEnd, currentPage } }) => {
        return isEnd ? undefined : currentPage + 1;
      },
    },
  );
};

export const useSubscribeArticlesQuery = (
  params?: GetParams<
    typeof ArticleApiService.articleControllerFindSubscribeArticle
  >,
) => {
  return useCoreInfiniteQuery<ResponseArticlePageDto>(
    queryKey.newArticles,
    ({ pageParam = 1 }) => {
      return ArticleApiService.articleControllerFindSubscribeArticle({
        ...params,
        page: pageParam,
        uuid: "1111",
      });
    },
    {
      getNextPageParam: ({ pagination: { isEnd, currentPage } }) => {
        return isEnd ? undefined : currentPage + 1;
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
    queryKey.bookmarkArticles,
    ({ pageParam = 1 }) => {
      return ArticleApiService.articleControllerFindBookmarkArticle({
        ...params,
        page: pageParam,
        uuid: "1111",
      });
    },
    {
      getNextPageParam: ({ pagination: { isEnd, currentPage } }) => {
        return isEnd ? undefined : currentPage + 1;
      },
    },
  );
};
