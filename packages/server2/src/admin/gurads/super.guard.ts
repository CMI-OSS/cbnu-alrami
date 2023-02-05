import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UseGuards,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

import { AdminAuthorityType } from "../admin.constant";
import { Admin } from "../entities/admin.entity";
import { AdminGuard } from "./admin.guard";

@Injectable()
export class Guard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const admin = request.admin as Admin;

    if (admin?.authoirty !== AdminAuthorityType.Super) {
      throw new ForbiddenException("Super 권한이 아닙니다.");
    }

    return true;
  }
}

export const SuperGuard = () => applyDecorators(AdminGuard(), UseGuards(Guard));
