import { Injectable } from "@nestjs/common";
import * as FCM from "fcm-node";
import { Data } from "./fcm.interfaces";

@Injectable()
export class FcmService {
  // private readonly serverKey;
  private readonly fcm;
  private readonly message;
  constructor() {
    // this.serverKey = this.configService.get("serverKey");
    // this.fcm = new FCM(this.serverKey);
    this.message = (to: string, data: Data, collapse_key: string) => ({
      to,
      collapse_key,
      notification: {
        title: data.title,
        body: data.body,
        click_action: "Result3Activity",
      },
      data,
    });
  }

  public send_notice(to: string, data: Data) {
    this.fcm.send(
      this.message(to, data, "com.jaryapp.myapplication3"),
      (err, res) => {
        if (err) {
          console.log(err);
          console.log("Something has gone wrong!");
        } else {
          console.log("Successfully sent with response: ", res);
        }
      },
    );
  }

  public send_notice_ios(to: string, data: Data) {
    this.fcm.send(this.message(to, data, "com.cmi.cbnu-alrami"), (err, res) => {
      if (err) {
        console.log(err);
        console.log("Something has gone wrong!");
      } else {
        console.log("Successfully sent with response: ", res);
      }
    });
  }
}
