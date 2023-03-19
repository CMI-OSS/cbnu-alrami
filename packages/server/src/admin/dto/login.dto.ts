import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsString } from "class-validator";

import { Admin } from "../entities/admin.entity";

export class LoginDto extends PickType(Admin, [ "loginId", "password" ]) {
  @ApiProperty({
    description: "비밀번호",
    example: "12345678",
  })
  @IsString()
  password: string;
}
