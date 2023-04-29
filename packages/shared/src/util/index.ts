import { apiServer } from "../constant";
import { OpenAPI } from "../swagger-api/generated";

const isMobileProduction = /www.mobile\.cmiteam\.kr/.test(window.location.href);
const isProduction = /www.mobile|www.admin|https:\/\/admin\.cmiteam\.kr/.test(
  window.location.href,
);

const setOpenApiBase = () => {
  const baseURL = apiServer.local;
  OpenAPI.BASE = baseURL;
};

export { isMobileProduction, isProduction, setOpenApiBase };
