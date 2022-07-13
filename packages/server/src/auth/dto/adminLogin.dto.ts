import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AdminLoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: "cmi" })
  loginId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: "cmi1234" })
  password: string;
}
