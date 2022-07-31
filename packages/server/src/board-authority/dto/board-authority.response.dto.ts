import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class BoardAuthorityResponseDto {
  @IsNotEmpty()
  @ApiProperty({ default: 4 })
  id!: number;

  @IsNotEmpty()
  @ApiProperty({ default: "xxx학생회" })
  name!: string;
}
