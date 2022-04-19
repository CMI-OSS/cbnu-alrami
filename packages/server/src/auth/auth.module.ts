import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AdminModule } from "src/admin/admin.module";
import { ACCESS_PRIVATE_KEY } from "src/commons/constants/constants";
import { JwtStrategy } from "src/commons/strategys/jwt.strategy";
import { LocalStrategy } from "src/commons/strategys/local.strategy";
import { UserModule } from "src/user/user.module";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    AdminModule,
    UserModule,
    JwtModule.register({
      secret: ACCESS_PRIVATE_KEY,
      signOptions: { expiresIn: "60m" },
    }),
  ],
  controllers: [ AuthController ],
  providers: [ AuthService, LocalStrategy, JwtStrategy ],
})
export class AuthModule {}
