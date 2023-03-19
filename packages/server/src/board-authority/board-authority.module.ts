import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminModule } from "src/admin/admin.module";
import { BoardModule } from "src/board/board.module";

import { BoardAuthority } from "./entities/board-authority.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([ BoardAuthority ]),
    AdminModule,
    BoardModule,
  ],
})
export class BoardAuthorityModule {}
