import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "src/api/baseQuery";

import type { imgType } from "../types";

// header.set("Content-type", "multipart/form-data");

export const boardWriteApi = createApi({
  reducerPath: "boardWriteApi",
  baseQuery,
  tagTypes: [ "ImgUpload", "writeArticle" ],
  endpoints: (build) => ({
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
      { title: string; boardId: number; content: string; images: Array<string> }
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
  }),
});

export const { useImgUploadMutation, useWriteArticleMutation } = boardWriteApi;
