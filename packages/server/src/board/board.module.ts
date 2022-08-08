import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "src/user/user.module";

import { BoardController } from "./board.controller";
import { BoardRepository } from "./board.repository";
import { BoardService } from "./board.service";

@Module({
  imports: [ TypeOrmModule.forFeature([ BoardRepository ]), UserModule ],
  controllers: [ BoardController ],
  providers: [ BoardService ],
  exports: [ BoardService ],
})
export class BoardModule {}
