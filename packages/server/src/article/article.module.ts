import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminModule } from "src/admin/admin.module";
import { ArticleImageModule } from "src/articleImage/articleImage.module";
import { BoardModule } from "src/board/board.module";
import { BoardTreeModule } from "src/boardTree/boardTree.module";
import { BookmarkRepository } from "src/bookmark/bookmark.repository";
import { FcmModule } from "src/fcm/fcm.module";
import { HitModule } from "src/hit/hit.module";
import { HitRepository } from "src/hit/hit.repository";
import { ImageModule } from "src/image/image.module";
import { SubscribeModule } from "src/subscribe/subscribe.module";
import { SubscribeRepository } from "src/subscribe/subscribe.repository";
import { UserModule } from "src/user/user.module";

import { ArticleController } from "./article.controller";
import { ArticleRepository } from "./article.repository";
import { ArticleService } from "./article.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArticleRepository,
      BookmarkRepository,
      HitRepository,
      SubscribeRepository,
    ]),
    AdminModule,
    BoardModule,
    BoardTreeModule,
    SubscribeModule,
    ImageModule,
    HitModule,
    FcmModule,
    UserModule,
    ArticleImageModule,
  ],
  controllers: [ ArticleController ],
  providers: [ ArticleService ],
  exports: [ ArticleService ],
})
export class ArticleModule {}
