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
      try {
        const admin = await this.jwtService.verify(adminToken);

        req.admin = admin;
      } catch (error) {
        req.admin = null;
      }
    }

    if (userUuid) {
      let user = await this.userService.findOne({
        where: { uuid: req.headers.uuid },
      });

      if (!user) {
        user = await this.userService.create({
          uuid: userUuid,
          fcmToken: req.headers.fcmtoken,
          device: req.headers.device,
        });
      }
      req.user = user;
    }

    next();
  }
}
