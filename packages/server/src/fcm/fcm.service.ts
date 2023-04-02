import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from "@nestjs/common";
import * as FCM from "fcm-node";
import { Article } from "src/article/entities/article.entity";
import { BoardService } from "src/board/board.service";
import configuration from "src/config/configuration";
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
    to: string,
    notification: { title: string; body: string },
    data?: object,
  ) {
    const { title, body } = notification;

    if (title == null || body == null) {
      throw new BadRequestException("Is empty!");
    }

    return {
      to,
      notification,
      data,
    };
  }

  public async sendNoticeArticle(article: Article): Promise<void> {
    if (!article.board?.id)
      throw new Error("[sendNoticeArticle] board가 존재하지 않음");

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

    subscribers.forEach((user) => {
      const notification = { title: boardTitle, body: article.title };
      const { fcmToken } = user;

      if (fcmToken)
        this.sendNotice(fcmToken, notification, {
          articleId: article.id.toString(),
          url: `https://dev-mobile.cmiteam.kr/article/detail/${article.id}`,
        });
    });
  }

  async sendNotice(
    to: string,
    notification: { title: string; body: string },
    data: object,
  ): Promise<void> {
    await this.fcm.send(
      FcmService.message(to, notification, data),
      async (err, res) => {
        if (err) {
          const { error } = JSON.parse(err).results[0];

          if ([ "InvalidRegistration", "NotRegistered" ].includes(error)) {
            await this.userService.deleteByFcmToken(to);
          }

          console.error("[sendNotice] ", { err });
        } else {
          // console.log("Successfully sent with response: ", res);
        }
      },
    );
  }
}
