import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { CreateBoardAuthorityDto } from "src/board-authority/dto/create-board-authority.dto";

import { AdminAuthorityType } from "../admin.constant";
import { AdminProperty } from "../admin.swagger";

export class CreateAdminDto {
  @AdminProperty.loginId()
  @IsString()
  loginId: string;

  @AdminProperty.password()
  @IsString()
  password: string;

  @AdminProperty.nickname()
  @IsString()
  nickname: string;

  @AdminProperty.authoirty()
  @IsEnum(AdminAuthorityType)
  @IsOptional()
  authoirty?: AdminAuthorityType;

  @ApiProperty({ type: [ CreateBoardAuthorityDto ] })
  @IsOptional()
  boards: CreateBoardAuthorityDto[];
}
