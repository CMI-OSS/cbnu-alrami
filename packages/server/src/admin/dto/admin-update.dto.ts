import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Authority } from "src/commons/constants/enums";

export class AdminUpdateDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  loginId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  nickname: string;

  @IsNotEmpty()
  @IsEnum(Authority)
  @ApiProperty()
  authority: Authority;
}
