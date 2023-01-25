import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class AdminGuard extends AuthGuard("admin-jwt") {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: Error, admin: any) {
    if (err || !admin) {
      throw err || new UnauthorizedException("Admin 권한이 없습니다.");
    }

    return admin;
  }
}
