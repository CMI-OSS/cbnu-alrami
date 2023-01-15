import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Injectable,
  UseGuards,
} from "@nestjs/common";
import { ApiHeader } from "@nestjs/swagger";

@Injectable()
class Guard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    return !!req.user;
  }
}

export const UserHeader = ApiHeader({
  name: "uuid",
  description: "user uuid",
});

export const UserGuard = () => {
  return applyDecorators(UseGuards(Guard), UserHeader);
};
