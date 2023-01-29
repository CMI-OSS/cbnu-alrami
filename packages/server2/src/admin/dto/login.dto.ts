import { PickType } from "@nestjs/swagger";

import { Admin } from "../entities/admin.entity";

export class LoginDto extends PickType(Admin, [ "loginId", "password" ]) {}
