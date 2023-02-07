import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ArticleViewService } from "./article.view.service";
import { ArticleView } from "./entities/article-view.entity";

@Module({
  imports: [ TypeOrmModule.forFeature([ ArticleView ]) ],
  providers: [ ArticleViewService ],
  exports: [ ArticleViewService ],
})
export class ArticleViewModule {}
