import { IsNotEmpty, IsString } from "class-validator";

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
