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
  description: "유저의 랜덤한 UUID",
  schema: {
    default: "1111",
  },
});

export const UserGuard = () => {
  return applyDecorators(UseGuards(Guard), UserHeader);
};
