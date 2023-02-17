import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleModule } from "src/article/article.module";

import { ArticleLikeService } from "./article-like.service";
import { ArticleLike } from "./entities/article-like.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([ ArticleLike ]),
    forwardRef(() => ArticleModule),
  ],
  providers: [ ArticleLikeService ],
  exports: [ ArticleLikeService ],
})
export class ArticleLikeModule {}
