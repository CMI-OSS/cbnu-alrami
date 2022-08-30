import { QueryFunctionContext, useInfiniteQuery, useQuery } from "react-query";

import { AxiosResponse } from "axios";
import caxios from "src/api/caxios";
import { Pagination } from "src/type/api";

export const fetchArticle = (articleId: number) => {
  return caxios.get<res.Article>(`/boards/articles/${articleId}`);
};

export const useArticle = (articleId: number) => {
  const response = useQuery<AxiosResponse<res.Article>, Error>(
    [ "article", articleId ],
    () => {
      return fetchArticle(articleId);
    },
  );
  return response;
};

export const fetchArticlesByBoard = (params: any) => {
  return caxios.get<Pagination<res.ArticleByBoard>>(
    `/boards/${params.boardId}/articles`,
    {
      params,
    },
  );
};

// TODO: select 리팩토링
export const useArticlesByBoard = (data: req.Pagination) => {
  const response = useInfiniteQuery<
    AxiosResponse<Pagination<res.ArticleByBoard>>,
    Error,
    (res.ArticleByBoard & { breadcrumb: string })[]
  >(
    [ "articles", data.boardId ],
    ({ pageParam = 1 }: QueryFunctionContext) => {
      return fetchArticlesByBoard({ pageNo: pageParam, ...data });
    },
    {
      select: (data) => {
        const pageParam = data.pageParams.at(-1) as number;
        const pageIndexes = Array.from(Array(pageParam), (_, index) => {
          return index;
        });
        const pages = pageIndexes.reduce(
          (
            acc: (res.ArticleByBoard & { breadcrumb: string })[][],
            cur: number,
          ) => {
            acc.push(
              data.pages[cur].data.contents.map((notice) => {
                return {
                  ...notice,
                  breadcrumb: notice.board.parent
                    ? `${notice.board.parent.name} > ${notice.board.name}`
                    : notice.board.name,
                };
              }),
            );
            return acc;
          },
          [],
        );

        return {
          pages,
          pageParams: data.pageParams,
        };
      },
      getNextPageParam: ({
        data: {
          pagination: { isEnd, pageNumber },
        },
      }) => {
        return isEnd ? undefined : pageNumber + 1;
      },
    },
  );
  return response;
};

export const fetchNewArticles = (params: any) => {
  return caxios.get<Pagination<res.ArticleByBoard>>(`/articles/subscribe`, {
    params,
  });
};

export const useNewArticles = () => {
  const response = useInfiniteQuery<
    AxiosResponse<Pagination<res.ArticleByBoard>>,
    Error,
    (res.ArticleByBoard & { breadcrumb: string })[]
  >(
    "newArticles",
    ({ pageParam = 1 }: QueryFunctionContext) => {
      return fetchNewArticles({ pageNo: pageParam });
    },
    {
      select: (data) => {
        const pageParam = data.pageParams.at(-1) as number;
        const pageIndexes = Array.from(Array(pageParam), (_, index) => {
          return index;
        });
        const pages = pageIndexes.reduce(
          (
            acc: (res.ArticleByBoard & { breadcrumb: string })[][],
            cur: number,
          ) => {
            acc.push(
              data.pages[cur].data.contents.map((notice) => {
                return {
                  ...notice,
                  breadcrumb: notice.board.parent
                    ? `${notice.board.parent.name} > ${notice.board.name}`
                    : notice.board.name,
                };
              }),
            );
            return acc;
          },
          [],
        );

        return {
          pages,
          pageParams: data.pageParams,
        };
      },
      getNextPageParam: ({
        data: {
          pagination: { isEnd, pageNumber },
        },
      }) => {
        return isEnd ? undefined : pageNumber + 1;
      },
    },
  );
  return response;
};

export const fetchPopularArticles = () => {
  return caxios.get<Pagination<res.ArticleByBoard>>(`/articles/popular`);
};

// TODO: 백엔드 res바뀌면 확인
export const usePopularArticles = () => {
  const response = useInfiniteQuery<
    AxiosResponse<Pagination<res.ArticleByBoard>>,
    Error,
    (res.ArticleByBoard & { breadcrumb: string })[]
  >("popularArticles", fetchPopularArticles, {
    select: (data) => {
      const pages = [
        data.pages[0].data.contents.map((article) => {
          return {
            ...article,
            breadcrumb: article.board.parent
              ? `${article.board.parent.name} > ${article.board.name}`
              : article.board.name,
          };
        }),
      ];
      return { pages, pageParams: data.pageParams };
    },
  });
  return response;
};

export const fetchBookmarkArticles = () => {
  return caxios.get<Pagination<res.ArticleByBoard>>(`/articles/bookmarks`);
};

export const useBookmarkArticles = () => {
  const response = useInfiniteQuery<
    AxiosResponse<Pagination<res.ArticleByBoard>>,
    Error,
    (res.ArticleByBoard & { breadcrumb: string })[]
  >("bookmarkArticles", fetchBookmarkArticles, {
    select: (data) => {
      const pages = [
        data.pages[0].data.contents.map((article) => {
          return {
            ...article,
            breadcrumb: article.board.parent
              ? `${article.board.parent.name} > ${article.board.name}`
              : article.board.name,
          };
        }),
      ];
      return { pages, pageParams: data.pageParams };
    },
  });
  return response;
};
