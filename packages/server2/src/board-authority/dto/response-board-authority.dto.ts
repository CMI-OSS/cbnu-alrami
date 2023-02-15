import { ApiProperty } from "@nestjs/swagger";
import { ResponseBoardDto } from "src/board/dto/response-board.dto";
import { Board } from "src/board/entities/board.entity";

import { BoardAuthority } from "../entities/board-authority.entity";

export class ResponseBoardAuthoriyDto extends BoardAuthority {
  @ApiProperty({
    description: "관리 권한이 있는 게시판",
    type: () => ResponseBoardDto,
  })
  board: Board;
}
