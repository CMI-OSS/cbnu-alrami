import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { BoardService } from "./board.service";
import { BoardCreateDto } from "./dto/board.create.dto";

@Controller("board")
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  async create(@Body() boardCreateDto: BoardCreateDto) {
    const board = await this.boardService.create(boardCreateDto);
    return board;
  }

}
