import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminService } from "src/admin/admin.service";
import { AdminRepository } from "src/admin/repository/admin.repository";
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

import { BookmarkControlelr } from "./bookmark.controller";
import { BookmarkRepository } from "./bookmark.repository";
import { BookmarkService } from "./bookmark.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArticleRepository,
      BookmarkRepository,
      HitRepository,
      BoardRepository,
      AdminRepository,
      BoardTreeRepository,
      ArticleImageRepository,
      ImageRepository,
      SubscribeRepository,
    ]),
  ],
  controllers: [ BookmarkControlelr ],
  providers: [
    BookmarkService,
    ArticleService,
    BoardService,
    AdminService,
    BoardTreeService,
    ArticleImageService,
    ImageService,
    SubscribeService,
    AwsService,
    ImageService,
  ],
})
export class BookmarkModule {}
