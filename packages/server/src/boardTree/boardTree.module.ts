import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardRepository } from "src/board/board.repository";
import { BoardService } from "src/board/board.service";
import { SubscribeRepository } from "src/subscribe/subscribe.repository";
import { SubscribeService } from "src/subscribe/subscribe.service";

import { BoardTreeController } from "./boardTree.controller";
import { BoardTreeRepository } from "./boardTree.repository";
import { BoardTreeService } from "./boardTree.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BoardTreeRepository,
      BoardRepository,
      SubscribeRepository,
    ]),
  ],
  controllers: [ BoardTreeController ],
  providers: [ BoardTreeService, BoardService, SubscribeService ],
})
export class BoardTreeModule {}
