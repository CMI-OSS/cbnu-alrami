import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleRepository } from "src/article/article.repository";
import { ArticleService } from "src/article/article.service";
import { ArticleImageRepository } from "src/articleImage/articleImage.repository";
import { ArticleImageService } from "src/articleImage/articleImage.service";
import { BoardRepository } from "src/board/board.repository";
import { BoardService } from "src/board/board.service";
import { BoardTreeRepository } from "src/boardTree/boardTree.repository";
import { BoardTreeService } from "src/boardTree/boardTree.service";
import { HitRepository } from "src/hit/hit.repository";
import { AwsService } from "src/image/aws.service";
import { ImageRepository } from "src/image/image.repository";
import { ImageService } from "src/image/image.service";
import { SubscribeRepository } from "src/subscribe/subscribe.repository";
import { SubscribeService } from "src/subscribe/subscribe.service";
import { UserRepository } from "src/user/repository/user.repository";

import { FcmService } from "../fcm/fcm.service";
import { BookmarkControlelr } from "./bookmark.controller";
import { BookmarkRepository } from "./bookmark.repository";
import { BookmarkService } from "./bookmark.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BookmarkRepository,
      ArticleRepository,
      BoardRepository,
      BoardTreeRepository,
      HitRepository,
      ArticleImageRepository,
      ImageRepository,
      SubscribeRepository,
      UserRepository,
    ]),
  ],
  controllers: [ BookmarkControlelr ],
  providers: [
    BoardService,
    BookmarkService,
    ArticleService,
    BoardTreeService,
    AwsService,
    ArticleImageService,
    SubscribeService,
    ImageService,
    FcmService,
  ],
})
export class BookmarkModule {}
