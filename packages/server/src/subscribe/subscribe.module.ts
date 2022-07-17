import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardRepository } from "src/board/board.repository";
import { BoardService } from "src/board/board.service";

import { SubscribeControlelr } from "./subscribe.controller";
import { SubscribeRepository } from "./subscribe.repository";
import { SubscribeService } from "./subscribe.service";

@Module({
  imports: [ TypeOrmModule.forFeature([ BoardRepository, SubscribeRepository ]) ],
  controllers: [ SubscribeControlelr ],
  providers: [ BoardService, SubscribeService ],
})
export class SubscribeModule {}
