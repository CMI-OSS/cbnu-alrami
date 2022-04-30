import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { BoardTreeController } from "./boardTree.controller";
import { BoardTreeRepository } from "./boardTree.repository";
import { BoardTreeService } from "./boardTree.service";

@Module({
  imports: [ TypeOrmModule.forFeature([ BoardTreeRepository ]) ],
  controllers: [ BoardTreeController ],
  providers: [ BoardTreeService ],
})
export class BoardTreeModule {}
