import {
  applyDecorators,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiHeader } from "@nestjs/swagger";

@Injectable()
export class Guard extends AuthGuard("admin") {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: Error, user: any) {
    if (err || !user) {
      throw err || new UnauthorizedException("Admin 권한이 없습니다.");
    }

    return user;
  }
}

export const AdminHeader = ApiHeader({
  name: "authorizaion",
  description: "admin accessToken",
  example:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0IiwiaWF0IjoxNjc0NjUzMTk0LCJleHAiOjE3MDYxODkxOTR9.c4Y-SdxTASJh8RyP5llZ5f4U-EnSrA15b_szH4GsQ3w",
});

export const AdminGuard = () => {
  return applyDecorators(UseGuards(Guard), AdminHeader);
};
