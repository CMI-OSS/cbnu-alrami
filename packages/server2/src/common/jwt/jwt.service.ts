import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import configuration from "src/config/configuration";

interface JwtPayload {
  sub: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class JWTService {
  constructor(private readonly jwtService: JwtService) {}

  async createJwtToken(payload: JwtPayload) {
    return this.jwtService.signAsync(payload, {
      secret: configuration.jwt.secret,
      expiresIn: configuration.jwt.expire,
    });
  }

  async verify(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: configuration.jwt.secret,
      });
    } catch (error) {
      throw new UnauthorizedException("잘못된 토큰입니다.");
    }
  }
}
