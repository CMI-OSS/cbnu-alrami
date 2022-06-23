import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class BoardCreateDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "board 이름" })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "board url" })
  url: string;
}
