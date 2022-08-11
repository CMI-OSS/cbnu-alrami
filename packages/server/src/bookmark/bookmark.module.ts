import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleModule } from "src/article/article.module";

import { BookmarkControlelr } from "./bookmark.controller";
import { BookmarkRepository } from "./bookmark.repository";
import { BookmarkService } from "./bookmark.service";

@Module({
  imports: [ ArticleModule, TypeOrmModule.forFeature([ BookmarkRepository ]) ],
  controllers: [ BookmarkControlelr ],
  providers: [ BookmarkService ],
  exports: [ BookmarkService ],
})
export class BookmarkModule {}
