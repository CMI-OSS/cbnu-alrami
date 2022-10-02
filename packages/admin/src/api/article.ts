import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "src/api/baseQuery";

import { ArticlePage } from "./types";

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery,
  tagTypes: [],
  endpoints: (build) => {
    return {
      getArticlePage: build.query<
        ArticlePage,
        { page: number; pageSize: number; boardId: number }
      >({
        query({ boardId, page, pageSize }) {
          return {
            url: `/boards/${boardId}/articles?pageNo=${page}&pageSize=${pageSize}`,
            method: "get",
          };
        },
      }),
    };
  },
});

export const { useGetArticlePageQuery } = articleApi;
