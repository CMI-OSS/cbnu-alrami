import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from "@nestjs/common";
import dayjs from "dayjs";
import * as FCM from "fcm-node";
import { Article } from "src/article/entities/article.entity";
import { BoardService } from "src/board/board.service";
import configuration from "src/config/configuration";
import { mobileServer } from "src/config/constant";
import isServerProduction from "src/config/util";
import { UserService } from "src/user/user.service";

@Injectable()
export class FcmService {
  private readonly serverKey: string;
  private readonly fcm;
  private readonly collapseKeyAndroid: string;
  private readonly collapseKeyIos: string;

  constructor(
    @Inject(forwardRef(() => BoardService))
    private readonly boardService: BoardService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {
    this.serverKey = configuration.fcm.key;
    this.fcm = new FCM(this.serverKey);
    this.collapseKeyAndroid = configuration.fcm.aos;
    this.collapseKeyIos = configuration.fcm.ios;
  }

  private static message(
    to: string | string[],
    notification: { title: string; body: string },
    data?: object,
  ) {
    const { title, body } = notification;

    if (title == null || body == null) {
      throw new BadRequestException("Is empty!");
    }

    if (typeof to === "string") {
      return {
        to,
        notification,
        data,
      };
    }

    return {
      registration_ids: to,
      notification,
      data,
    };
  }

  public async sendNoticeArticle(article: Article): Promise<void> {
    if (!article.board?.id)
      throw new Error("[sendNoticeArticle] board가 존재하지 않음");

    const today = dayjs();

    // 공지사항 작성일이 오늘이 아니면 notification 보내지 않음
    if (!today.isSame(dayjs(article.dateTime), "day")) return;

    const subscribers = await this.boardService.getNoticeUsers(
      article.board.id,
    );

    const board = await this.boardService.findOne(article.board.id);

    if (subscribers.length === 0) {
      return;
    }

    const boardTitle = board.parent
      ? `${board.parent.name} > ${board.name}`
      : board.name;

    const notification = { title: boardTitle, body: article.title };
    const tokens = subscribers
      .map((subscriber) => subscriber.fcmToken)
      .filter((value): value is string => {
        return typeof value === "string";
      });

    const chunkSize = 1000;

    for (let i = 0; i < tokens.length; i += chunkSize) {
      const chunkTokens = tokens.slice(i, i + chunkSize);

      this.sendNotice(chunkTokens, notification, {
        articleId: article.id.toString(),
        url: `${
          isServerProduction ? mobileServer.production : mobileServer.dev
        }/article/detail/${article.id}`,
      });
    }
  }

  async sendNotice(
    // FCM에서는 단일 요청으로 최대 2000개의 등록 토큰에게 알림을 보낼 수 있습니다
    to: string | string[],
    notification: { title: string; body: string },
    data: object,
  ): Promise<void> {
    await this.fcm.send(
      FcmService.message(to, notification, data),
      async (err, res) => {
        if (err) {
          if (typeof to === "string") {
            const { error } = JSON.parse(err).results[0];

            if ([ "InvalidRegistration", "NotRegistered" ].includes(error)) {
              await this.userService.deleteByFcmToken(to);
            }
          }

          console.error("[sendNotice] ", { err });
        } else {
          // console.log("Successfully sent with response: ", res);
        }
      },
    );
  }
}
