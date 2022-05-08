import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BoardService } from "src/board/board.service";
import { Public } from "src/commons/decorators/public.decorator";

import { BoardTreeService } from "./boardTree.service";
import { BoardTreeResponseDto } from "./dto/boardTree.response.dto";

@Public()
@Controller({
  path: "board-tree",
})
@ApiTags("[boardTree] 공지사항 사이트 계층구조 도메인 API")
export class BoardTreeController {
  constructor(private readonly boardTreeService: BoardTreeService) {}

  @Get()
  async findAll() {
    return this.boardTreeService.findAll();
  }

  @Get(":boardId")
  async findByBoard(
    @Param("boardId") boardId: number,
  ): Promise<BoardTreeResponseDto> {
    return this.boardTreeService.findByBoard(boardId);
  }
}
