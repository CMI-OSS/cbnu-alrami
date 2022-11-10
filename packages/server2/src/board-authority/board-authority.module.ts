import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminModule } from "src/admin/admin.module";
import { BoardModule } from "src/board/board.module";

import { BoardAuthorityController } from "./board-authority.controller";
import { BoardAuthorityService } from "./board-authority.service";
import { BoardAuthority } from "./entities/board-authority.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([ BoardAuthority ]),
    AdminModule,
    BoardModule,
  ],
  controllers: [ BoardAuthorityController ],
  providers: [ BoardAuthorityService ],
})
export class BoardAuthorityModule {}
