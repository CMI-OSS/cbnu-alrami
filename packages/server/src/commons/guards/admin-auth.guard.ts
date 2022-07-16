import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class AdminAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    // TODO: 어드민 권한별로 분기
    return !!req.admin;
  }
}
