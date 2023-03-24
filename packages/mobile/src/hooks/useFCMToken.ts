import { useEffect } from "react";

import { UserApiService } from "@shared/swagger-api/generated";
import { getUuid } from "src/utils/storage";

const useFCMToken = () => {
  useEffect(() => {
    const handler = async () => {
      const token = localStorage.getItem("token");

      const uuid = getUuid();

      if (token && uuid) {
        await UserApiService.userControllerUpdate({
          requestBody: { fcmToken: token },
          uuid,
        });
      } else {
        setTimeout(handler, 1000);
      }
    };

    setTimeout(handler, 1000);
  }, []);
};

export default useFCMToken;
