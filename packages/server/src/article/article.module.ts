import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminModule } from "src/admin/admin.module";
import { AdminService } from "src/admin/admin.service";
import { BoardModule } from "src/board/board.module";
import { BoardRepository } from "src/board/board.repository";
import { BoardService } from "src/board/board.service";
import { BoardTreeRepository } from "src/boardTree/boardTree.repository";
import { BoardTreeService } from "src/boardTree/boardTree.service";
import { BookmarkRepository } from "src/bookmark/bookmark.repository";
import { HitRepository } from "src/hit/hit.repository";
import { AwsService } from "src/image/aws.service";
import { ImageModule } from "src/image/image.module";
import { ImageRepository } from "src/image/image.repository";
import { ImageService } from "src/image/image.service";

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
      ImageRepository,
    ]),
    AdminModule,
    BoardModule,
  ],
  controllers: [ ArticleController ],
  providers: [
    ArticleService,
    BoardService,
    BoardTreeService,
    AwsService,
    ImageService,
  ],
})
export class ArticleModule {}
