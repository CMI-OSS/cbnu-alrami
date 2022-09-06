import http from "src/api/core";

export const getWeathers = (): Promise<res.Weather> => {
  return http.get("/weathers");
};
