import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardModule } from "src/board/board.module";

import { JWTModule } from "../common/jwt/jwt.module";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { Admin } from "./entities/admin.entity";

@Module({
  imports: [ TypeOrmModule.forFeature([ Admin ]), BoardModule, JWTModule ],
  controllers: [ AdminController ],
  providers: [ AdminService ],
  exports: [ AdminService ],
})
export class AdminModule {}
