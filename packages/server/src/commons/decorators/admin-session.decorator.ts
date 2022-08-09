import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AdminCredential } from "src/auth/dto/admin-credential.dto";

export const AdminSession = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AdminCredential => {
    const request = ctx.switchToHttp().getRequest();
    return request.admin;
  },
);
