import { ApiProperty } from "@nestjs/swagger";

export class BoardTreeAllResponseDto {
  @ApiProperty({ description: "board id(pk값)" })
  id!: number;

  @ApiProperty({ description: "board 이름" })
  name!: string;

  @ApiProperty({ description: "board url" })
  url!: string;

  @ApiProperty({ description: "하위 board" })
  children: BoardTreeAllResponseDto[];
}
