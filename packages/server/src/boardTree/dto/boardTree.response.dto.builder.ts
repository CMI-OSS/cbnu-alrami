import { BoardResponseDto } from "src/board/dto/board.response.dto";

import { BoardTreeResponseDto } from "./boardTree.response.dto";

export class BoardTreeResponseDtoBuilder {
  id: number;
  name: string;
  parent: BoardResponseDto;

  setId(id: number) {
    this.id = id;
    return this;
  }

  setName(name: string) {
    this.name = name;
    return this;
  }

  setParent(parent: BoardResponseDto) {
    this.parent = parent;
    return this;
  }

  build() {
    return new BoardTreeResponseDto(this);
  }
}
