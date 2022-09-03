import { useCoreInfiniteQuery, useCoreQuery } from "@hooks/api/core";
import {
  fetchArticle,
  fetchBoardArticles,
  fetchBookmarkArticles,
  fetchNewArticles,
  fetchPopularArticles,
} from "src/api/article";
import { queryKey } from "src/consts/react-query";

export const useArticleQuery = (articleId: req.Article["articleId"]) => {
  return useCoreQuery(queryKey.article(articleId), () => {
    return fetchArticle(articleId);
  });
};

// TODO: pages[0]으로 접근안하고 가지고오기

export const useBoardArticlesQuery = (boardId: req.Article["boardId"]) => {
  return useCoreInfiniteQuery(
    queryKey.boardArticles(boardId),
    ({ pageParam = 1 }) => {
      return fetchBoardArticles({ boardId, pageNo: pageParam });
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
      return fetchBookmarkArticles();
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
      return fetchNewArticles({ pageNo: pageParam });
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
    queryKey.popularArtucles,
    ({ pageParam = 1 }) => {
      return fetchPopularArticles();
    },
    {
      getNextPageParam: ({ pagination: { isEnd, pageNumber } }) => {
        return isEnd ? undefined : pageNumber + 1;
      },
    },
  );
};
