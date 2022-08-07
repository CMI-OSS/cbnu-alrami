import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

import { Authority } from "../constants/enums";

@Injectable()
export class AdminCouncilGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    return !!(
      req.admin.authority === Authority.StudentCouncil ||
      req.admin.authority === Authority.Super
    );
  }
}
