import { useEffect } from "react";

import { UserApiService } from "@shared/swagger-api/generated";
import { getUuid } from "src/utils/storage";
import { isWebView } from "src/utils/webview";

const useFCMToken = () => {
  useEffect(() => {
    const handler = async () => {
      if (!isWebView) return;

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
