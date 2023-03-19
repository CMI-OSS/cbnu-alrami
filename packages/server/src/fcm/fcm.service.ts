import { BadRequestException, Injectable } from "@nestjs/common";
import * as FCM from "fcm-node";
import { BoardService } from "src/board/board.service";
import configuration from "src/config/configuration";
import { Device } from "src/user/user.constant";
import { UserService } from "src/user/user.service";

@Injectable()
export class FcmService {
  private readonly serverKey: string;
  private readonly fcm;
  private readonly collapseKeyAndroid: string;
  private readonly collapseKeyIos: string;

  constructor(
    private readonly boardService: BoardService,
    private readonly userService: UserService,
  ) {
    this.serverKey = configuration.fcm.key;
    this.fcm = new FCM(this.serverKey);
    this.collapseKeyAndroid = configuration.fcm.aos;
    this.collapseKeyIos = configuration.fcm.ios;
  }

  private static async message(
    to: string,
    data: { title: string; body: string },
    collapseKey: string,
  ) {
    const { title, body } = data;

    if (title == null || body == null) {
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
    const subscribers = await this.boardService.getSubscribers(boardId);

    if (subscribers.length === 0) {
      return;
    }

    subscribers.forEach((user) => {
      const data = { title: "CMI", body: "공지사항 등록" };
      const { fcmToken } = user;

      if (fcmToken && user.device === Device.AOS) {
        this.sendNotice(fcmToken, data, this.collapseKeyAndroid);
      } else if (fcmToken && user.device === Device.IOS) {
        this.sendNotice(fcmToken, data, this.collapseKeyIos);
      }
    });
  }

  async sendNotice(
    to: string,
    data: { title: string; body: string },
    collapseKey: string,
  ): Promise<void> {
    await this.fcm.send(
      await FcmService.message(to, data, collapseKey),
      async (err, res) => {
        if (err) {
          if (JSON.parse(err).results[0].error === "InvalidRegistration") {
            await this.userService.deleteByFcmToken(to);
          }
          throw new BadRequestException(err);
        } else {
          console.log("Successfully sent with response: ", res);
        }
      },
    );
  }
}
