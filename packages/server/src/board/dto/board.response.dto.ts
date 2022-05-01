import { BoardResponseDtoBuilder } from "./board.response.dto.builder";

export class BoardResponseDto {
  id!: number;
  name!: string;

  constructor(builder: BoardResponseDtoBuilder) {
    this.id = builder.id;
    this.name = builder.name;
  }
}
