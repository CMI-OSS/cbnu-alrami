import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { BoardController } from "./board.controller";
import { BoardService } from "./board.service";
import { Board } from "./entities/board.entity";

@Module({
  imports: [ TypeOrmModule.forFeature([ Board ]) ],
  controllers: [ BoardController ],
  providers: [ BoardService ],
  exports: [ BoardService ],
})
export class BoardModule {}
