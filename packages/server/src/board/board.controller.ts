import { Controller, Get, Inject, Param, ParseIntPipe } from "@nestjs/common";
import { BoardService } from "./board.service";

@Controller("board")
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get(":boardId")
  test(@Param("boardId", ParseIntPipe) id: number): Promise<boolean> {
    return this.boardService.test(id);
  }
}
