import { PartialType, PickType } from "@nestjs/swagger";

import { Admin } from "../entities/admin.entity";

export class LoginDto extends PartialType(
  PickType(Admin, [ "loginId", "password" ]),
) {}
