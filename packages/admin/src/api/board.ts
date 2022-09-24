import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "src/api/baseQuery";

import type { imgType } from "../types";
import { AuthorityBoard } from "./types";

// header.set("Content-type", "multipart/form-data");

export type ArticleResponse = {
  id: string;
  title: string;
  board: {
    id: number;
    name: string;
  };
  content: string;
  images: {
    id: number;
    url: string;
  }[];
  hits: number;
  scraps: number;
  date: string;
  url: string;
};

export type ArticleUpdateDto = {
  boardId: number;
  title: string;
  content: string;
  url: string;
  date: string;
  images: string[];
};

export const boardWriteApi = createApi({
  reducerPath: "boardWriteApi",
  baseQuery,
  tagTypes: [ "ImgUpload", "writeArticle", "updateArticle" ],
  endpoints: (build) => {
    return {
      imgUpload: build.mutation<imgType[], FormData>({
        query(data) {
          return {
            url: "upload/images",
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: [ "ImgUpload" ],
      }),
      writeArticle: build.mutation<
        number,
        {
          title: string;
          boardId: number;
          content: string;
          images: Array<string>;
        }
      >({
        query(data) {
          return {
            url: `boards/${data.boardId}/article`,
            method: "POST",
            body: {
              title: data.title,
              content: data.content,
              images: data.images,
              date: new Date(),
            },
          };
        },
        invalidatesTags: [ "writeArticle" ],
      }),
      updateArticle: build.mutation<
        number,
        {
          articleId: number;
          article: ArticleUpdateDto;
        }
      >({
        query(data) {
          return {
            url: `/articles/${data.articleId}`,
            method: "PUT",
            body: data.article,
          };
        },
        invalidatesTags: [ "updateArticle" ],
      }),
      getArticle: build.query<
        ArticleResponse,
        {
          articleId: number;
        }
      >({
        query(data) {
          return {
            url: `boards/articles/${data.articleId}`,
            method: "get",
          };
        },
      }),
      getAuthorityBoards: build.query<AuthorityBoard[], void>({
        query() {
          return {
            url: `authority/boards`,
            method: "get",
          };
        },
      }),
    };
  },
});

export const {
  useImgUploadMutation,
  useWriteArticleMutation,
  useUpdateArticleMutation,
  useGetArticleQuery,
  useGetAuthorityBoardsQuery,
} = boardWriteApi;
