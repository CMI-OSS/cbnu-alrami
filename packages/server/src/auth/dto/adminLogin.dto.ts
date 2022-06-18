import { IsNotEmpty, IsString } from "class-validator";

export class AdminLoginDto {
  @IsNotEmpty()
  @IsString()
  loginId: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
