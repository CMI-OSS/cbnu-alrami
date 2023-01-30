import {
  applyDecorators,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth } from "@nestjs/swagger";

@Injectable()
export class Guard extends AuthGuard("admin") {
  constructor() {
    super({
      property: "admin",
    });
  }

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

export const AdminGuard = () => {
  return applyDecorators(UseGuards(Guard), ApiBearerAuth("access-token"));
};
