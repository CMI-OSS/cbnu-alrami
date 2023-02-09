import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleModule } from "src/article/article.module";

import { ArticleViewService } from "./article-view.service";
import { ArticleView } from "./entities/article-view.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([ ArticleView ]),
    forwardRef(() => ArticleModule),
  ],
  providers: [ ArticleViewService ],
  exports: [ ArticleViewService ],
})
export class ArticleViewModule {}
