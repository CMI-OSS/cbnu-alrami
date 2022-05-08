import { BoardResponseDto } from "src/board/dto/board.response.dto";

export class BoardTreeResponseDto {
  id!: number;
  name!: string;
  parent: BoardResponseDto;
}
