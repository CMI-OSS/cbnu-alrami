import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardRepository } from "src/board/board.repository";
import { BoardService } from "src/board/board.service";

import { BoardTreeController } from "./boardTree.controller";
import { BoardTreeRepository } from "./boardTree.repository";
import { BoardTreeService } from "./boardTree.service";

@Module({
  imports: [ TypeOrmModule.forFeature([ BoardTreeRepository, BoardRepository ]) ],
  controllers: [ BoardTreeController ],
  providers: [ BoardTreeService, BoardService ],
})
export class BoardTreeModule {}
