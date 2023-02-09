import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ArticleBookmarkService } from "./article-bookmark.service";
import { ArticleBookmark } from "./entities/article-bookmark";

@Module({
  imports: [ TypeOrmModule.forFeature([ ArticleBookmark ]) ],
  providers: [ ArticleBookmarkService ],
  exports: [ ArticleBookmarkService ],
})
export class ArticleBookmarkModule {}
