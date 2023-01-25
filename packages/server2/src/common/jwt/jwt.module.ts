import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { JWTService } from "./jwt.service";

@Module({
  imports: [ JwtModule.register({}) ],
  providers: [ JWTService ],
  exports: [ JWTService ],
})
export class JWTModule {}
