import { ApiError } from "@shared/swagger-api/generated/core/ApiError";

const fallbackApi = async <T extends (...args: any) => Promise<any>>(
  api: T,
): Promise<Awaited<ReturnType<T>>> => {
  try {
    return await api();
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 401) {
        // eslint-disable-next-line no-restricted-globals
        location.href = "/login";
      }
    }
    throw error;
  }
};

export default fallbackApi;
