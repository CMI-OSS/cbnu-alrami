import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as FCM from "fcm-node";
import { isNil } from "lodash";

import { BookmarkRepository } from "../bookmark/bookmark.repository";
import { Device } from "../commons/entities/user.entity";
import { HitRepository } from "../hit/hit.repository";
import { SubscribeRepository } from "../subscribe/subscribe.repository";
import { UserRepository } from "../user/repository/user.repository";
import { Data } from "./fcm.interfaces";

@Injectable()
export class FcmService {
  private readonly serverKey;
  private readonly fcm;

  constructor(
    private readonly configService: ConfigService,
    private readonly subscribeRepository: SubscribeRepository,
    private readonly userRepository: UserRepository,
    private readonly bookmarkRepository: BookmarkRepository,
    private readonly hitRepository: HitRepository,
  ) {
    this.serverKey = this.configService.get("fcm").serverKey;
    this.fcm = new FCM(this.serverKey);
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
        this.sendNotice(fcmToken, data, "com.jaryapp.myapplication3");
      } else if (user.device === Device.IOS) {
        this.sendNotice(fcmToken, data, "com.cmi.cbnu-alrami");
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
