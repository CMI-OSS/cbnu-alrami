import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardModule } from "src/board/board.module";
import { SubscribeRepository } from "src/subscribe/subscribe.repository";
import { SubscribeService } from "src/subscribe/subscribe.service";

import { BoardTreeController } from "./boardTree.controller";
import { BoardTreeRepository } from "./boardTree.repository";
import { BoardTreeService } from "./boardTree.service";

@Module({
  imports: [
    BoardModule,
    TypeOrmModule.forFeature([ BoardTreeRepository, SubscribeRepository ]),
  ],
  controllers: [ BoardTreeController ],
  providers: [ BoardTreeService, SubscribeService ],
})
export class BoardTreeModule {}
