import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ArticleLikeService } from "./article-like.service";
import { ArticleLike } from "./entities/article-like.entity";

@Module({
  imports: [ TypeOrmModule.forFeature([ ArticleLike ]) ],
  providers: [ ArticleLikeService ],
  exports: [ ArticleLikeService ],
})
export class ArticleLikeModule {}
