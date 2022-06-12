import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { Authority } from "../constants/enums";
import { AUTHORITY_KEY } from "../decorators/Authorities.decorator";
import { errors } from "../error";

const { AUTHORITY_REQUIRED } = errors;
@Injectable()
export class AuthoritiesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(ctx: ExecutionContext): boolean {
    const authorities = this.reflector.getAllAndOverride<Authority[]>(
      AUTHORITY_KEY,
      [ ctx.getClass(), ctx.getHandler() ],
    );
    if (!authorities) return true;
    const { user } = ctx.switchToHttp().getRequest();
    if (
      user.authority !== Authority.Super &&
      !authorities.some((authority) => user.authority === authority)
    )
      throw AUTHORITY_REQUIRED;
    return true;
  }
}
