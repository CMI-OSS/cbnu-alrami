import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "src/api/baseQuery";

import { imgType } from "../types/index";

export const boardWriteApi = createApi({
  reducerPath: "boardWriteApi",
  baseQuery: baseQuery(),
  tagTypes: [ "ImgUpload" ],
  endpoints: (build) => {
    return {
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
    };
  },
});

export const { useImgUploadMutation } = boardWriteApi;
