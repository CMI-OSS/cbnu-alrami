import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class AdminAuthGuard extends AuthGuard("jwt") {
  // TODO: 어드민 권한별로 분기
}
