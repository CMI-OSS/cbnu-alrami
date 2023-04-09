import { Test } from "@nestjs/testing";

import { AppModule } from "../../../server/src/app.module";
import { FcmService } from "./fcm.service";

describe("FCM module", () => {
  let fcmService: FcmService;
  const data = { title: "CMI", body: "공지사항 알림 테스트" };
  const IOS =
    "cyZiY2-vLkjni_Qx7RBOLq:APA91bEmEYg6TZpvaXYLZ3cmzsxsQ9aZslqhf9Gki-EPo6APk48dmNp16KmzDN2JHmm9Gy_GEjbk4ZSSWwltRisOnobSEVBuPBM-MN1WnHhhLpVe8wKIsj3zUSdsgi-pGmeZJWWI5jvc";

  const ANDORIOD =
    "fsbiefTlSSmSSUArzfyPK9:APA91bGG14rAlFJGLjJoa6JW03ziDK3Er01j9hfMmSj98O7M3LpH17G2ArIw9K91YPoUZsIGd8Ec86R2XDHkpx_LqJWbjNatrutJkYEu2KI5LdJHF6wcGCtNU625FWTz43Ea__YPVwH_";

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ AppModule ],
    }).compile();

    fcmService = module.get<FcmService>(FcmService);
  });

  test("send message ios", async () => {
    await fcmService.sendNotice(IOS, data, {});
  });

  test("send message aos", async () => {
    await fcmService.sendNotice(ANDORIOD, data, {});
  });

  test("send message multiple", async () => {
    await fcmService.sendNotice([ ANDORIOD, IOS, "4444" ], data, {});
  });
});
