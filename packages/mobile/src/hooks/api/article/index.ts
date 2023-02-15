import {useCoreInfiniteQuery} from "@hooks/api/core";
import {getBoardArticles,} from "src/api/article";
import {queryKey} from "src/consts/react-query";

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
