import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardTreeRepository } from "src/boardTree/boardTree.repository";
import { BoardTreeService } from "src/boardTree/boardTree.service";
import { HitRepository } from "src/hit/hit.repository";

import { ArticleController } from "./article.controller";
import { ArticleRepository } from "./article.repository";
import { ArticleService } from "./article.service";

@Module({
  imports: [ TypeOrmModule.forFeature([ ArticleRepository, BoardTreeRepository, HitRepository ]) ],
  controllers: [ ArticleController ],
  providers: [ ArticleService, BoardTreeService ],
})
export class ArticleModule {}
