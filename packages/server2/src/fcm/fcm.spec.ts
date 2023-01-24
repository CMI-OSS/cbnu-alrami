import { Test } from "@nestjs/testing";
import configuration from "src/config/configuration";

import { AppModule } from "../../../server/src/app.module";
import { FcmService } from "./fcm.service";

describe("FCM module", () => {
  let fcmService: FcmService;
  const data = { title: "CMI", body: "공지사항 등록" };
  const jessToken =
    "e_0SK777s0T3o7cNvAQZND:APA91bG6oF0hYTRKrmkjMSpZqC2bjRLGOM4AroSq3oMQn3UZRzRtkqFfNwgMVyCTlzeVLLb2YS0qR-I649aRCbxoGiy6nZPMQ8ncVCDXGzOUdiMGuee9HNIjgHB_Kbw5EHmV8eWMR9fl";

  const stevenToken =
    "c4fcfW99BMY:APA91bFRIIv-ZUrYYHjcfbVeOb4LPM3TQQVcmCeUTJ2OEvpEC7-4dspfkUiTndLoIJYHMOij2Duh0ZJnJtghBGoTV6YyI4livrNu98LphkvQSc2OUFgej07Anszam9ZlYZW_aXV5SzcN";

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ AppModule ],
    }).compile();

    fcmService = module.get<FcmService>(FcmService);
  });

  test("send message ios", async () => {
    await fcmService.sendNotice(jessToken, data, configuration.fcm.ios);
  });

  test("send message aos", async () => {
    await fcmService.sendNotice(stevenToken, data, configuration.fcm.aos);
  });
});
