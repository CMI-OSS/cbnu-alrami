import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ACCESS_PRIVATE_KEY } from "src/@constants/constants";
import { JwtStrategy } from "src/@strategy/jwt.strategy";
import { LocalStrategy } from "src/@strategy/local.strategy";
import { AdminModule } from "src/admin/admin.module";
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
