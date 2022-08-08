import { ApiProperty } from "@nestjs/swagger";

export class CafeteriaResponseDto {
  @ApiProperty({ default: 1 })
  id: number;

  @ApiProperty({ default: "메뉴" })
  content: string;

  @ApiProperty({ default: 1 })
  time: number;
}
