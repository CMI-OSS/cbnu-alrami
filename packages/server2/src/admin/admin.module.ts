import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardModule } from "src/board/board.module";
import { JWTService } from "src/common/jwt/jwt.service";
import { JwtStrategy } from "src/common/jwt/jwt.strategy";
import { PasswordUtils } from "src/common/util/password.utils";

import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { Admin } from "./entities/admin.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([ Admin ]),
    BoardModule,
    JwtModule.register({}),
  ],
  controllers: [ AdminController ],
  providers: [ AdminService, JWTService, JwtStrategy, PasswordUtils ],
  exports: [ AdminService ],
})
export class AdminModule {}
