import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response } from "express";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UserService } from "src/user/user.service";

@Injectable()
export class UserMiddleWare implements NestMiddleware {
  constructor(private userService: UserService) {}

  async use(req: any, res: Response, next: NextFunction) {
    const { uuid, fcmToken } = req.headers;

    if (uuid) {
      let user = await this.userService.findOne(uuid);

      if (!user) {
        user = await this.userService.create({ uuid } as CreateUserDto);
      }
      req.user = user;
    }

    next();
  }
}
