import { useInfiniteQuery, useQuery } from "react-query";

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

export const fetchArticlesByBoard = (data: req.Pagination) => {
  return caxios.get<Pagination<res.ArticleByBoard>>(
    `/boards/${data.boardId}/articles`,
    {
      data,
    },
  );
};

export const useArticlesByBoard = (data: req.Pagination) => {
  const response = useInfiniteQuery<
    AxiosResponse<Pagination<res.ArticleByBoard>>,
    Error,
    Pagination<res.ArticleByBoard & { breadcrumb: string }>
  >(
    [ "articles", data.boardId ],
    () => {
      return fetchArticlesByBoard(data);
    },
    // TODO: select return type
    {
      select: (data) => {
        const contents = data.data.contents.map((notice) => {
          return {
            ...notice,
            breadcrumb: notice.board.parent
              ? `${notice.board.parent.name} > ${notice.board.name}`
              : notice.board.name,
          };
        });
        return { pagination: data.data.pagination, contents };
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

export const fetchNewArticles = () => {
  return caxios.get<Pagination<res.ArticleByBoard>>(`/articles/subscribe`);
};

export const useNewArticles = () => {
  const response = useInfiniteQuery<
    AxiosResponse<Pagination<res.ArticleByBoard>>,
    Error,
    Pagination<res.ArticleByBoard & { breadcrumb: string }>
  >(
    "newArticles",
    () => {
      return fetchNewArticles();
    },
    {
      // TODO: select return type
      select: (data) => {
        const contents = data.data.contents.map((notice) => {
          return {
            ...notice,
            breadcrumb: notice.board.parent
              ? `${notice.board.parent.name} > ${notice.board.name}`
              : notice.board.name,
          };
        });
        return { pagination: data.data.pagination, contents };
      },
    },
  );
  return response;
};

export const fetchPopularArticles = () => {
  return caxios.get<res.ArticleByBoard[]>(`/articles/popular`);
};

export const usePopularArticles = () => {
  const response = useQuery<
    AxiosResponse<res.ArticleByBoard[]>,
    Error,
    { contents: (res.ArticleByBoard & { breadcrumb: string })[] }
  >("popularArticles", fetchPopularArticles, {
    select: (data) => {
      const contents = data?.data.map((article) => {
        return {
          ...article,
          breadcrumb: article.board.parent
            ? `${article.board.parent.name} > ${article.board.name}`
            : article.board.name,
        };
      });
      return { contents };
    },
  });
  return response;
};

export const fetchBookmarkArticles = () => {
  return caxios.get<res.ArticleByBoard[]>(`/articles/bookmarks`);
};

export const useBookmarkArticles = () => {
  const response = useQuery<
    AxiosResponse<res.ArticleByBoard[]>,
    Error,
    { contents: (res.ArticleByBoard & { breadcrumb: string })[] }
  >("bookmarkArticles", fetchBookmarkArticles, {
    select: (data) => {
      const contents = data?.data.map((article) => {
        return {
          ...article,
          breadcrumb: article.board.parent
            ? `${article.board.parent.name} > ${article.board.name}`
            : article.board.name,
        };
      });
      return { contents };
    },
  });
  return response;
};
