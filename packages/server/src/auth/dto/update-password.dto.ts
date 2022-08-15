import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "새 비밀번호" })
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "기존 비밀번호" })
  password: string;
}
