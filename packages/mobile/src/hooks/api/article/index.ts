import { useCoreInfiniteQuery, useCoreQuery } from "@hooks/api/core";
import {
  getArticle,
  getBoardArticles,
  getBookmarkArticles,
  getNewArticles,
  getPopularArticles,
} from "src/api/article";
import { queryKey } from "src/consts/react-query";

export const useArticleQuery = (articleId: req.Article["articleId"]) => {
  return useCoreQuery(queryKey.article(articleId), () => {
    return getArticle(articleId);
  });
};

// TODO: pages[0]으로 접근안하고 가지고오기 (useInfiniteCoreQuery select type 정의)

export const useBoardArticlesQuery = (boardId: req.Article["boardId"]) => {
  return useCoreInfiniteQuery(
    queryKey.boardArticles(boardId),
    ({ pageParam = 1 }) => {
      return getBoardArticles({ boardId, pageNo: pageParam });
    },
    {
      getNextPageParam: ({ pagination: { isEnd, pageNumber } }) => {
        return isEnd ? undefined : pageNumber + 1;
      },
    },
  );
};

export const useBookmarkArticlesQuery = () => {
  return useCoreInfiniteQuery(
    queryKey.bookmarkArticles,
    ({ pageParam = 1 }) => {
      return getBookmarkArticles();
    },
    {
      getNextPageParam: ({ pagination: { isEnd, pageNumber } }) => {
        return isEnd ? undefined : pageNumber + 1;
      },
    },
  );
};

export const useNewArticlesQuery = () => {
  return useCoreInfiniteQuery(
    queryKey.newArticles,
    ({ pageParam = 1 }) => {
      return getNewArticles({ pageNo: pageParam });
    },
    {
      getNextPageParam: ({ pagination: { isEnd, pageNumber } }) => {
        return isEnd ? undefined : pageNumber + 1;
      },
    },
  );
};

export const usePopularArticlesQuery = () => {
  return useCoreInfiniteQuery(
    queryKey.popularArticles,
    ({ pageParam = 1 }) => {
      return getPopularArticles();
    },
    {
      getNextPageParam: ({ pagination: { isEnd, pageNumber } }) => {
        return isEnd ? undefined : pageNumber + 1;
      },
    },
  );
};
