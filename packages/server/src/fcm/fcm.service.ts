/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
/* eslint-disable no-useless-constructor */
  // eslint-disable-next-line class-methods-use-this

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import * as FCM from "fcm-node";
import { isNil } from "lodash";

import {Data} from "./fcm.interfaces";


@Injectable()
export class FcmService {
  private readonly serverKey;
  private readonly fcm;
  constructor() {
    // this.serverKey = this.configService.get("isNilserverKey");
    // this.fcm = new FCM(this.serverKey);
  }

  private message(to: string, data: Data, collapse_key: string) {
    try {
      const { title, body } = data;

      if (isNil(title) || isNil(body)) {
        throw new BadRequestException("Is empty!");
      }

      return {
        to,
        collapse_key,
        notification: {
          title: data.title,
          body: data.body,
          click_action: "Result3Activity",
        },
        data,
      };
    } catch (err) {
      throw new InternalServerErrorException("Server error");
    }
  }

  public sendNoticeAndroid(to: string, data: Data) {
    try {
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
    } catch (err) {
      throw new InternalServerErrorException("Server error");
    }
  }

  public sendNoticeIos(to: string, data: Data) {
    try {
      this.fcm.send(
        this.message(to, data, "com.cmi.cbnu-alrami"),
        (err, res) => {
          if (err) {
            console.log(err);
            console.log("Something has gone wrong!");
          } else {
            console.log("Successfully sent with response: ", res);
          }
        },
      );
    } catch (err) {
      throw new InternalServerErrorException("Server error");
    }
  }
}
