import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "src/commons/entities/user.entity";

export const UserSession = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
