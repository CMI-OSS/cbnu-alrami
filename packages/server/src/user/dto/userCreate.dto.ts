import { IsNotEmpty, IsString } from "class-validator";

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  uuid: string;

  @IsNotEmpty()
  @IsString()
  fcmToken: string;
}
