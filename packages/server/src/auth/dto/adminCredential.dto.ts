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
  nickname: string;

  @IsNotEmpty()
  @IsEnum(Authority)
  authority: Authority;
}
