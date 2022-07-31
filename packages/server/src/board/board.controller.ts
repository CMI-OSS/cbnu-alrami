import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Board } from "src/commons/entities/board.entity";
import { UserAuthGuard } from "src/commons/guards/user-auth.guard";

import { BoardService } from "./board.service";
import { BoardCreateDto } from "./dto/board.create.dto";
import { BoardUpdateDto } from "./dto/board.update.dto";

@Controller("boards")
@ApiTags("[board] 공지사항 사이트 도메인 API")
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @ApiOperation({
    summary: "공지사항 사이트 생성 API",
    description: "새로운 board를 생성한다.",
  })
  @ApiResponse({
    status: 201,
    description: "생성된 board 객체",
    type: Board,
  })
  async create(@Body() boardCreateDto: BoardCreateDto) {
    const board = await this.boardService.create(boardCreateDto);
    return board;
  }

  @Get()
  @ApiOperation({
    summary: "전체 공지사항 사이트 조회 API",
    description: "모든 board를 조회한다.",
  })
  @ApiHeader({
    name: "uuid",
    description: "user uuid",
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: "전체 공지사항 사이트 리스트",
    type: Board,
    isArray: true,
  })
  @UseGuards(UserAuthGuard)
  async findAll(): Promise<Board[]> {
    return this.boardService.findAll();
  }

  @Get(":boardId")
  @ApiOperation({
    summary: "특정 공지사항 사이트 조회 API",
    description: "id를 이용, 특정 board를 조회한다.",
  })
  @ApiResponse({
    status: 200,
    description: "path variable를 pk로 가지는 board 객체",
    type: Board,
  })
  async findOne(@Param("boardId") boardId: number): Promise<Board> {
    return this.boardService.findById(boardId);
  }

  @Put(":boardId")
  @ApiOperation({
    summary: "특정 공지사항 사이트 수정 API",
    description: "특정 board를 수정한다.",
  })
  @ApiBody({
    schema: {
      properties: {
        name: { type: "string" },
        url: { type: "string" },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: "수정한 board 객체",
    type: Board,
  })
  async update(
    @Param("boardId") boardId: number,
    @Body() boardUpdateDto: BoardUpdateDto,
  ): Promise<Board> {
    return this.boardService.update(boardId, boardUpdateDto);
  }

  @Delete(":boardId")
  @ApiOperation({
    summary: "특정 공지사항 사이트 삭제 API",
    description: "id를 이용, 특정 board를 삭제한다.",
  })
  @ApiResponse({
    status: 200,
    description: "true",
    type: "string",
  })
  async remove(@Param("boardId") boardId: number) {
    return this.boardService.remove(boardId);
  }
}
