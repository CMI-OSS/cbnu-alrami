import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "src/lib/axiosBaseQuery";

export const boardWriteApi = createApi({
  reducerPath: "boardWriteApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    imgUpload: build.mutation<string[], FormData>({
      query(data) {
        return {
          url: "upload/images",
          method: "POST",
          data,
        };
      },
    }),
  }),
});

export const { useImgUploadMutation } = boardWriteApi;
