import { Test } from "@nestjs/testing";

import { AppModule } from "../../../server/src/app.module";
import { FcmService } from "./fcm.service";

describe("FCM module", () => {
  let fcmService: FcmService;
  const data = { title: "CMI", body: "공지사항 등록" };
  const 제스 =
    "fH3Qkxyj-UnQr2PFa-xHL0:APA91bFS9BAXPqPSM5RLt-QmsEbYFsTPbHDsRFeQcCRYqAzpbet3BD298gLxDgkPMs0S7CTiGqLLkTpiSTnY8cBgl5pXeoRfRuH3VZkMHAwfhGehOFtZ3kO5e-YIu1gB8b8cNITzYCQI";

  const 브루니 =
    "d_2nPsxlDkYMottYFPHjOY:APA91bHpaRkD6lmcc1CFLRY1Gb0mBQVMVd6RoQw0OwPNVmUBa_hqRuaWT-j3V5VxSPUFpB3-sVaI6bdEeMaNLeLEUzzlqEhirE-fN1na6F_Mr0w0EOOQ11B5JUAMRRLovbMN0IqZ48Zm";

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ AppModule ],
    }).compile();

    fcmService = module.get<FcmService>(FcmService);
  });

  test("send message ios", async () => {
    await fcmService.sendNotice(제스, data, {});
  });

  test("send message aos", async () => {
    await fcmService.sendNotice(브루니, data, {});
  });
});
