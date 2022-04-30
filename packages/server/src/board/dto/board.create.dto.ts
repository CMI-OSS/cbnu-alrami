import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class BoardCreateDto {
  @IsNotEmpty()
  @ApiProperty({ description: "board 이름" })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ description: "board url" })
  url: string;
}
