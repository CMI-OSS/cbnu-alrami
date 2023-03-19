import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AdminService } from "src/admin/admin.service";
import configuration from "src/config/configuration";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "admin") {
  constructor(private readonly adminService: AdminService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configuration.jwt.secret,
      ignoreExpiration: false,
      passReqToCallback: false,
    });
  }

  async validate(payload, req) {
    const admin = await this.adminService.findOneByLoginId(payload.sub);

    if (!admin) {
      throw new UnauthorizedException("Admin 권한이 없습니다.");
    }

    return admin;
  }
}
