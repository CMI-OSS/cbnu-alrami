import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as FCM from "fcm-node";
import { isNil } from "lodash";

import { Device } from "../commons/entities/user.entity";
import { SubscribeRepository } from "../subscribe/subscribe.repository";
import { UserRepository } from "../user/repository/user.repository";
import { Data } from "./fcm.interfaces";

@Injectable()
export class FcmService {
  private readonly serverKey;
  private readonly fcm;
  private readonly collapseKeyAndroid;
  private readonly collapseKeyIos;

  constructor(
    private readonly configService: ConfigService,
    private readonly subscribeRepository: SubscribeRepository,
    private readonly userRepository: UserRepository,
  ) {
    this.serverKey = this.configService.get("fcm").serverKey;
    this.fcm = new FCM(this.serverKey);
    this.collapseKeyAndroid = this.configService.get("fcm").collapseKeyAndroid;
    this.collapseKeyIos = this.configService.get("fcm").collapseKeyIos;
  }

  private static message(to: string, data: Data, collapseKey: string) {
    const { title, body } = data;

    if (isNil(title) || isNil(body)) {
      throw new BadRequestException("Is empty!");
    }

    return {
      to,
      collapse_key: collapseKey,
      notification: {
        title: data.title,
        body: data.body,
        click_action: "Result3Activity",
      },
      data,
    };
  }

  public async sendNotices(boardId: number): Promise<void> {
    const subscribes = await this.subscribeRepository.findUserByBoard(boardId);

    if (subscribes.length === 0) {
      return;
    }

    const userIds = subscribes.map((subscribe) => {
      return subscribe.user.id;
    });

    const users = await this.userRepository.findUserById(userIds);

    users.forEach((user) => {
      const data = { title: "CMI", body: "공지사항 등록" };
      const { fcmToken } = user;

      if (user.device === Device.ANDROID) {
        this.sendNotice(fcmToken, data, this.collapseKeyAndroid);
      } else if (user.device === Device.IOS) {
        this.sendNotice(fcmToken, data, this.collapseKeyIos);
      }
    });
  }

  private async sendNotice(
    to: string,
    data: Data,
    collapseKey: string,
  ): Promise<void> {
    await this.fcm.send(
      FcmService.message(to, data, collapseKey),
      async (err, res) => {
        if (err) {
          if (JSON.parse(err).results[0].error === "InvalidRegistration") {
            await this.userRepository.delete({ fcmToken: to });
          }
          throw new BadRequestException(err);
        } else {
          console.log("Successfully sent with response: ", res);
        }
      },
    );
  }
}
