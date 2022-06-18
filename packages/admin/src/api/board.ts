import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "src/api/baseQuery";

export const boardWriteApi = createApi({
  reducerPath: "boardWriteApi",
  baseQuery,
  tagTypes: [ "ImgUpload" ],
  endpoints: (build) => ({
    imgUpload: build.mutation<string[], FormData>({
      query(data) {
        console.log(data.getAll("image"));
        return {
          url: "upload/images",
          method: "POST",
          data,
        };
      },
      invalidatesTags: [ "ImgUpload" ],
    }),
  }),
});

export const { useImgUploadMutation } = boardWriteApi;
