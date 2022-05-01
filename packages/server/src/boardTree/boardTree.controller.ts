import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BoardService } from "src/board/board.service";
import { Public } from "src/commons/decorators/public.decorator";

import { BoardTreeService } from "./boardTree.service";
import { BoardTreeResponseDto } from "./dto/boardTree.response.dto";

@Public()
@Controller({
  path: "boards/trees",
})
@ApiTags("[boardTree] 공지사항 사이트 계층구조 도메인 API")
export class BoardTreeController {
  constructor(
    private readonly boardTreeService: BoardTreeService,
    private readonly boardService: BoardService,
  ) {}

  @Get(":boardId")
  async findByBoard(
    @Param("boardId") boardId: number,
  ): Promise<BoardTreeResponseDto> {
    const board = await this.boardService.findById(boardId);
    return this.boardTreeService.findByBoard(board);
  }
}
