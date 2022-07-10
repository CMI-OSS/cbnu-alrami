import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Response } from "express";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async use(req: any, res: Response, next: NextFunction) {
    const adminToken = req.headers["x-access-token"];
    const userUuid = req.headers.uuid;

    if (adminToken) {
      const admin = await this.jwtService.verify(adminToken);

      req.admin = admin;
    }

    if (userUuid) {
      const user = await this.userService.findOne({
        where: { uuid: req.headers.uuid },
      });

      req.user = user;
    }

    next();
  }
}
