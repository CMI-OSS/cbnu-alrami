import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_URL}/`,
  prepareHeaders: (headers) => {
    headers.set("x-access-token", localStorage.getItem("x-access-token") || "");
    return headers;
  },
});

const baseQueryMiddleware: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 403) {
    alert("권한이 없습니다. 로그인 페이지로 이동합니다");
    // eslint-disable-next-line no-restricted-globals
    location.href = "/login";
  }
  return result;
};

export default baseQueryMiddleware;
