import { apiServer } from "../constant";
import { OpenAPI } from "../swagger-api/generated";

// TODO: 배포되면 mobile, admin으로 바꿔야함
const isMobileProduction = /dev-mobile\.cmiteam\.kr/.test(window.location.href);
const isAdminProduction = /dev-admin\.cmiteam\.kr/.test(window.location.href);
const isProduction = isMobileProduction || isAdminProduction;

const setOpenApiBase = () => {
  const baseURL = isProduction ? apiServer.production : apiServer.dev;
  OpenAPI.BASE = baseURL;
};

export { isMobileProduction, isAdminProduction, setOpenApiBase };
