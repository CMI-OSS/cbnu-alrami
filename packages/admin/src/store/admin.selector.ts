import { AdminApiService } from "@shared/swagger-api/generated/services/AdminApiService";
import { selector } from "recoil";

export const adminSelector = selector({
  key: "admin",
  get: async () => {
    const response = await AdminApiService.adminControllerFindMe();
    return response;
  },
});
