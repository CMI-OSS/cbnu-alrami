import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminModule } from "src/admin/admin.module";
import { ArticleBookmarkModule } from "src/article-bookmark/article-bookmark.module";
import { ArticleLikeModule } from "src/article-like/article-like.module";
import { ArticleViewModule } from "src/article-view/article-view.module";
import { BoardModule } from "src/board/board.module";
import { ImageModule } from "src/image/image.module";

import { ArticleController } from "./article.controller";
import { ArticleService } from "./article.service";
import { Article } from "./entities/article.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([ Article ]),
    forwardRef(() => BoardModule),
    forwardRef(() => ArticleViewModule),
    forwardRef(() => ArticleBookmarkModule),
    forwardRef(() => ArticleLikeModule),
    ImageModule,
    forwardRef(() => AdminModule),
  ],
  controllers: [ ArticleController ],
  providers: [ ArticleService ],
  exports: [ ArticleService ],
})
export class ArticleModule {}
