import { BoardResponseDto } from "src/board/dto/board.response.dto";

import { BoardTreeResponseDtoBuilder } from "./boardTree.response.dto.builder";

export class BoardTreeResponseDto {
  id!: number;
  name!: string;
  parent: BoardResponseDto;

  constructor(builder: BoardTreeResponseDtoBuilder) {
    this.id = builder.id;
    this.name = builder.name;
    this.parent = builder.parent;
  }
}
