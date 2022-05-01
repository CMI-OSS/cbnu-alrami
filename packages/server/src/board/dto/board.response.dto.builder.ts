import { BoardResponseDto } from "./board.response.dto";

export class BoardResponseDtoBuilder {
  id: number;
  name: string;

  setId(id: number) {
    this.id = id;
    return this;
  }

  setName(name: string) {
    this.name = name;
    return this;
  }

  build() {
    return new BoardResponseDto(this);
  }
}
