import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class UserAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    return !!req.user;
  }
}
