import { useCoreQuery } from "@hooks/api/core";
import { ArticleApiService } from "@shared/swagger-api/generated";
import { queryKey } from "src/consts/react-query";
import { GetParams } from "src/type/utils";

export const usePopularArticlesQuery = (
  params: GetParams<
    typeof ArticleApiService.articleControllerFindPopularArticles
  >,
) => {
  return useCoreQuery(
    queryKey.popularArticles,
    () => {
      return ArticleApiService.articleControllerFindPopularArticles(params);
    },
    {
      select: (data) => {
        return data.articles;
      },
    },
  );
};

export const useSubscribeArticlesQuery = (
  params: GetParams<
    typeof ArticleApiService.articleControllerFindSubscribeArticle
  >,
) => {
  return useCoreQuery(
    queryKey.newArticles,
    () => {
      return ArticleApiService.articleControllerFindSubscribeArticle(params);
    },
    {
      select: (data) => {
        return data.articles;
      },
    },
  );
};
