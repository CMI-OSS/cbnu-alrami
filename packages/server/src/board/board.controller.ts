import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { BoardService } from "./board.service";
import { BoardCreateDto } from "./dto/board.create.dto";
import { Board } from "../@entities/board.entity";
import { BoardUpdateDto } from "./dto/board.update.dto";
import { Public } from "src/@decorator/public.decorator";

@Controller("boards")
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @Public()
  @UsePipes(ValidationPipe)
  async create(@Body() boardCreateDto: BoardCreateDto) {
    const board = await this.boardService.create(boardCreateDto);
    return board;
  }

  @Get()
  @Public()
  async findAll(): Promise<Board[]> {
    return this.boardService.findAll();
  }

  @Get(":boardId")
  @Public()
  async findOne(@Param("boardId") boardId: number): Promise<Board> {
    return this.boardService.findById(boardId);
  }

  // 수정이 아니라 새로 추가되고 있음ㅠ
  @Put(":boardId")
  @Public()
  @UsePipes(ValidationPipe)
  async update(
    @Param("boardId") boardId: number,
    @Body() boardUpdateDto: BoardUpdateDto,
  ): Promise<void> {
    return this.boardService.update(boardId, boardUpdateDto);
  }

  // 리턴 타입 수정 필요
  @Delete(":boardId")
  @Public()
  async remove(@Param("boardId") boardId: number) {
    const board = await this.boardService.findById(boardId);
    return this.boardService.remove(boardId);
  }
}
