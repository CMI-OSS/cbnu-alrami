import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from "axios";
import axios from "axios";

import { HTTP_METHOD } from "../../consts/api";

const handleRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  return {
    ...config,
    headers: {
      ...config.headers,
      uuid: "1111",
    },
  };
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleResponse = <T>(response: AxiosResponse<T>) => {
  return response.data;
};

const createApiMethod = (_axiosInstance: AxiosInstance, method: Method) => {
  return (
    url: AxiosRequestConfig["url"],
    config?: Omit<AxiosRequestConfig, "url">,
  ): Promise<any> => {
    return _axiosInstance({
      ...handleRequest({ url, ...config }),
      method,
    })
      .then((res) => {
        return handleResponse(res);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
};

export default {
  get: createApiMethod(axiosInstance, HTTP_METHOD.GET),
  post: createApiMethod(axiosInstance, HTTP_METHOD.POST),
  patch: createApiMethod(axiosInstance, HTTP_METHOD.PATCH),
  put: createApiMethod(axiosInstance, HTTP_METHOD.PUT),
  delete: createApiMethod(axiosInstance, HTTP_METHOD.DELETE),
};
