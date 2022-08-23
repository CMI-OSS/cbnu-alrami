import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "src/api/baseQuery";

import type { imgType } from "../types";

export const boardWriteApi = createApi({
  reducerPath: "boardWriteApi",
  baseQuery: baseQuery(),
  tagTypes: [ "ImgUpload", "writeArticle" ],
  endpoints: (build) => ({
    imgUpload: build.mutation<imgType[], FormData>({
      query(data) {
        return {
          url: "upload/images",
          method: "POST",
          data,
        };
      },
      invalidatesTags: [ "ImgUpload" ],
    }),
    writeArticle: build.mutation<
      number,
      { title: string; boardId: number; content: string; images: Array<string> }
    >({
      query(data) {
        return {
          url: `boards/${data.boardId}/article`,
          method: "POST",
          data: {
            title: data.title,
            content: data.content,
            images: data.images,
            url: "none",
            date: new Date(),
          },
        };
      },
      invalidatesTags: [ "writeArticle" ],
    }),
  }),
});

export const { useImgUploadMutation, useWriteArticleMutation } = boardWriteApi;
