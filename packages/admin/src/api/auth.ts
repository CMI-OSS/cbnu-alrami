import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "src/api/baseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  tagTypes: [ "login" ],
  endpoints: (build) => {
    return {
      login: build.mutation<
        {
          xAccessToken: string;
        },
        { loginId: string; password: string }
      >({
        query(data) {
          return {
            url: "auth/admins/login",
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: [ "login" ],
      }),
    };
  },
});

export const { useLoginMutation } = authApi;
