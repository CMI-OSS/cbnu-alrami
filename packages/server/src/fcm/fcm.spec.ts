import { Test } from "@nestjs/testing";

import { AppModule } from "../../../server/src/app.module";
import { FcmService } from "./fcm.service";

describe("FCM module", () => {
  let fcmService: FcmService;
  const data = { title: "CMI", body: "공지사항 등록" };
  const jessToken =
    "fH3Qkxyj-UnQr2PFa-xHL0:APA91bFS9BAXPqPSM5RLt-QmsEbYFsTPbHDsRFeQcCRYqAzpbet3BD298gLxDgkPMs0S7CTiGqLLkTpiSTnY8cBgl5pXeoRfRuH3VZkMHAwfhGehOFtZ3kO5e-YIu1gB8b8cNITzYCQI";

  const stevenToken =
    "c4fcfW99BMY:APA91bFRIIv-ZUrYYHjcfbVeOb4LPM3TQQVcmCeUTJ2OEvpEC7-4dspfkUiTndLoIJYHMOij2Duh0ZJnJtghBGoTV6YyI4livrNu98LphkvQSc2OUFgej07Anszam9ZlYZW_aXV5SzcN";

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ AppModule ],
    }).compile();

    fcmService = module.get<FcmService>(FcmService);
  });

  test("send message ios", async () => {
    await fcmService.sendNotice(jessToken, data);
  });

  test.skip("send message aos", async () => {
    await fcmService.sendNotice(stevenToken, data);
  });
});
