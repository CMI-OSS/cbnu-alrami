import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

import { AdminAuthorityType } from "../admin.constant";
import { Admin } from "../entities/admin.entity";

@Injectable()
export class SuperGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const admin = request.user as Admin;

    if (admin?.authoirty !== AdminAuthorityType.Super) {
      throw new ForbiddenException("Super 권한이 아닙니다.");
    }

    return true;
  }
}
