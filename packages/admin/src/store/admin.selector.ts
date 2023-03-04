import { AdminApiService } from "@shared/swagger-api/generated/services/AdminApiService";
import { selector } from "recoil";
import fallbackApi from "src/lib/api";

export const adminSelector = selector({
  key: "admin",
  get: async () => {
    const response = await fallbackApi(AdminApiService.adminControllerFindMe);
    return response;
  },
});
