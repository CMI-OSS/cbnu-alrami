import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleModule } from "src/article/article.module";

import { ArticleBookmarkService } from "./article-bookmark.service";
import { ArticleBookmark } from "./entities/article-bookmark";

@Module({
  imports: [
    TypeOrmModule.forFeature([ ArticleBookmark ]),
    forwardRef(() => ArticleModule),
  ],
  providers: [ ArticleBookmarkService ],
  exports: [ ArticleBookmarkService ],
})
export class ArticleBookmarkModule {}
