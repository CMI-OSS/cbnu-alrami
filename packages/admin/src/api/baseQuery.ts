import { BaseQueryFn, fetchBaseQuery } from "@reduxjs/toolkit/query";
import axios, { AxiosRequestConfig, AxiosError } from "axios";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_URL}/`,
  prepareHeaders: (headers) => {
    headers.set("Content-type", "application/json; charset=utf-8");
    return headers;
  },
});

const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({
        url: `${import.meta.env.VITE_API_URL}/${url}`,
        method,
        headers: {
          "x-access-token": localStorage.getItem("x-access-token") || "",
          "x-refresh-token": localStorage.getItem("x-refresh-token") || "",
        },
        data,
        params,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default axiosBaseQuery;
