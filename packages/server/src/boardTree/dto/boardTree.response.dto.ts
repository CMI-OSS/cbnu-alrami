import { ApiProperty } from "@nestjs/swagger";
import { BoardResponseDto } from "src/board/dto/board.response.dto";

export class BoardTreeResponseDto {
  @ApiProperty({ description: "board id(pk값)" })
  id!: number;

  @ApiProperty({ description: "board 이름" })
  name!: string;

  @ApiProperty({ description: "상위(부모) board" })
  parent: BoardResponseDto;
}
