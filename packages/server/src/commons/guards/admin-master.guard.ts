import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

import { Authority } from "../constants/enums";

@Injectable()
export class AdminMasterGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    return !!(req.admin.authority === Authority.Super);
  }
}
