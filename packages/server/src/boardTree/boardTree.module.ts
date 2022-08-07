import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardModule } from "src/board/board.module";
import { SubscribeModule } from "src/subscribe/subscribe.module";

import { BoardTreeController } from "./boardTree.controller";
import { BoardTreeRepository } from "./boardTree.repository";
import { BoardTreeService } from "./boardTree.service";

@Module({
  imports: [
    BoardModule,
    SubscribeModule,
    TypeOrmModule.forFeature([ BoardTreeRepository ]),
  ],
  controllers: [ BoardTreeController ],
  providers: [ BoardTreeService ],
  exports: [ BoardTreeService ],
})
export class BoardTreeModule {}
