import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, Matches } from "class-validator";
import { Authority } from "src/commons/constants/enums";

export class AdminCreateDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    default: "cmi",
  })
  loginId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    default: "cmi1234",
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    default: "테스트 관리자",
  })
  nickname: string;

  @IsNotEmpty()
  @IsEnum(Authority)
  @ApiProperty({
    default: "Super",
  })
  authority: Authority;
}
