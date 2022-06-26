import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AdminCredential } from "src/auth/dto/adminCredential.dto";
import { ACCESS_PRIVATE_KEY } from "src/commons/constants/constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader("x-access-token"),
      ignoreExpiration: false,
      secretOrKey: ACCESS_PRIVATE_KEY,
    });
  }

  async validate(adminCredential: AdminCredential): Promise<AdminCredential> {
    return adminCredential;
  }
  
}
