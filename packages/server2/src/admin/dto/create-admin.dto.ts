import { IsEnum, IsOptional, IsString } from "class-validator";

import { Authority } from "../admin.constant";

export class CreateAdminDto {
  @IsString()
  loginId: string;

  @IsString()
  password: string;

  @IsString()
  nickname: string;

  @IsEnum(Authority)
  @IsOptional()
  authoirty?: Authority;
}
