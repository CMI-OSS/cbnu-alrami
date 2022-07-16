import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
} from "class-validator";
import { Authority } from "src/commons/constants/enums";

export class AdminCredential {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-z0-9_]{2,18}$/)
  @ApiProperty()
  nickname: string;

  @IsNotEmpty()
  @IsEnum(Authority)
  @ApiProperty()
  authority: Authority;
}
