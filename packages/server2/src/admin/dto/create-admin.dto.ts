import { IsArray, IsEnum, IsOptional, IsString } from "class-validator";
import { Board } from "src/board/entities/board.entity";

import { Authority } from "../admin.constant";

export class CreateAdminDto {
  @IsString()
  loginId: string;

  @IsString()
  password: string;

  @IsString()
  nickname: string;

  @IsEnum(Authority)
  authoirty: Authority;

  @IsArray()
  @IsOptional()
  boards: Board[];
}
