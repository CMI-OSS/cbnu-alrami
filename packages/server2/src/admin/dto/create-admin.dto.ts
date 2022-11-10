import { IsEnum, IsOptional, IsString } from "class-validator";

import { AdminAuthorityType } from "../admin.constant";

export class CreateAdminDto {
  @IsString()
  loginId: string;

  @IsString()
  password: string;

  @IsString()
  nickname: string;

  @IsEnum(AdminAuthorityType)
  @IsOptional()
  authoirty?: AdminAuthorityType;
}
