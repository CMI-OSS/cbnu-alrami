import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

import { Device } from "../../commons/entities/user.entity";

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  uuid: string;

  @IsNotEmpty()
  @IsString()
  fcmToken: string;

  @IsOptional()
  @IsEnum(Device)
  device: Device;
}
