import { apiServer } from "@shared/constant";
import { OpenAPI } from "@shared/swagger-api/generated/core/OpenAPI";
import { AdminApiService } from "@shared/swagger-api/generated/services/AdminApiService";

import configuration from "../config/configuration";

OpenAPI.BASE = apiServer.local;

export const login = async () => {
  const { accessToken } = await AdminApiService.adminControllerLogin({
    requestBody: {
      loginId: configuration.scraperLoginId,
      password: configuration.scraperLoginPassword,
    },
  });

  OpenAPI.TOKEN = accessToken;
};
