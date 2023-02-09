import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminModule } from "src/admin/admin.module";
import { ArticleViewModule } from "src/article-view/article-view.module";
import { BoardModule } from "src/board/board.module";
import { ImageModule } from "src/image/image.module";

import { ArticleBookmark } from "../article-bookmark/entities/article-bookmark";
import { ArticleController } from "./article.controller";
import { ArticleService } from "./article.service";
import { Article } from "./entities/article.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([ Article, ArticleBookmark ]),
    forwardRef(() => BoardModule),
    forwardRef(() => ArticleViewModule),
    ImageModule,
    forwardRef(() => AdminModule),
  ],
  controllers: [ ArticleController ],
  providers: [ ArticleService ],
  exports: [ ArticleService ],
})
export class ArticleModule {}
