import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardModule } from "src/board/board.module";
import { BoardTreeRepository } from "src/boardTree/boardTree.repository";

import { SubscribeController } from "./subscribe.controller";
import { SubscribeRepository } from "./subscribe.repository";
import { SubscribeService } from "./subscribe.service";

@Module({
  imports: [
    BoardModule,
    TypeOrmModule.forFeature([ SubscribeRepository, BoardTreeRepository ]),
  ],
  controllers: [ SubscribeController ],
  providers: [ SubscribeService ],
  exports: [ SubscribeService ],
})
export class SubscribeModule {}
