import { IsEnum, IsNotEmpty, IsString, Matches } from "class-validator";
import { Authority } from "src/commons/constants/enums";

export class AdminCreateDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-z0-9_]{4,18}$/)
  loginId: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/)
  password: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-z0-9_]{2,18}$/)
  nickname: string;

  @IsNotEmpty()
  @IsEnum(Authority)
  authority: Authority;
}
