import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleModule } from "src/article/article.module";

import { BoardController } from "./board.controller";
import { BoardService } from "./board.service";
import { Board } from "./entities/board.entity";

@Module({
  imports: [ TypeOrmModule.forFeature([ Board ]), forwardRef(() => ArticleModule) ],
  controllers: [ BoardController ],
  providers: [ BoardService ],
  exports: [ BoardService ],
})
export class BoardModule {}
