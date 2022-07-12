import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminModule } from "src/admin/admin.module";
import { ArticleImageRepository } from "src/articleImage/articleImage.repository";
import { ArticleImageService } from "src/articleImage/articleImage.service";
import { BoardRepository } from "src/board/board.repository";
import { BoardService } from "src/board/board.service";
import { BoardTreeRepository } from "src/boardTree/boardTree.repository";
import { BoardTreeService } from "src/boardTree/boardTree.service";
import { BookmarkRepository } from "src/bookmark/bookmark.repository";
import { HitRepository } from "src/hit/hit.repository";
import { AwsService } from "src/image/aws.service";
import { ImageRepository } from "src/image/image.repository";
import { ImageService } from "src/image/image.service";
import { SubscribeRepository } from "src/subscribe/subscribe.repository";
import { SubscribeService } from "src/subscribe/subscribe.service";

import { ArticleController } from "./article.controller";
import { ArticleRepository } from "./article.repository";
import { ArticleService } from "./article.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArticleRepository,
      BookmarkRepository,
      BoardRepository,
      BoardTreeRepository,
      HitRepository,
      ArticleImageRepository,
      ImageRepository,
      SubscribeRepository,
    ]),
    AdminModule,
  ],
  controllers: [ ArticleController ],
  providers: [
    ArticleService,
    BoardService,
    BoardTreeService,
    AwsService,
    ArticleImageService,
    SubscribeService,
    ImageService,
  ],
})
export class ArticleModule {}
