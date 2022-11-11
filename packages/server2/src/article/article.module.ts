import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardModule } from "src/board/board.module";

import { ArticleController } from "./article.controller";
import { ArticleService } from "./article.service";
import { Article } from "./entities/article.entity";

@Module({
  imports: [ TypeOrmModule.forFeature([ Article ]), forwardRef(() => BoardModule) ],
  controllers: [ ArticleController ],
  providers: [ ArticleService ],
  exports: [ ArticleService ],
})
export class ArticleModule {}
