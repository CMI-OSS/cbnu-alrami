import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { UpdatableCommonEntityKeys } from "src/common/entity";

import { AdminAuthorityType } from "../admin.constant";
import { Admin } from "../entities/admin.entity";

export class CreateAdminDto extends OmitType(Admin, [
  ...UpdatableCommonEntityKeys,
  "boards",
]) {
  @ApiProperty({
    description: "비밀번호",
    example: "12345678",
  })
  @IsString()
  password: string;

  @IsEnum(AdminAuthorityType)
  @IsOptional()
  authoirty?: AdminAuthorityType;

  @ApiProperty({ type: [ Number ], description: "게시판 아이디 목록" })
  @IsOptional()
  boardIds: number[];
}
