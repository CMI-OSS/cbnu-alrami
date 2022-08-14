import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserSession } from "src/commons/decorators/user-session.decorator";
import { User } from "src/commons/entities/user.entity";
import { UserAuthGuard } from "src/commons/guards/user-auth.guard";

import { BoardTreeService } from "./boardTree.service";
import { BoardTreeAllResponseDto } from "./dto/boardTree.all.response.dto";
import { BoardTreeResponseDto } from "./dto/boardTree.response.dto";

@Controller({
  path: "board-tree",
})
@ApiTags("[boardTree] 공지사항 사이트 계층구조 도메인 API")
export class BoardTreeController {
  constructor(private readonly boardTreeService: BoardTreeService) {}

  @Get()
  @ApiOperation({
    summary: "공지사항 사이트 전체 계층구조 조회 API",
    description: "모든 board의 계층 구조를 조회한다.",
  })
  @ApiResponse({
    status: 200,
    description: "공지사항 사이트 전체 계층 구조",
    type: BoardTreeAllResponseDto,
    isArray: true,
  })
  @ApiHeader({
    name: "uuid",
    description: "user uuid",
  })
  @UseGuards(UserAuthGuard)
  async findAll(@UserSession() user: User) {
    return this.boardTreeService.getBoardTreeHierarchy(user.id);
  }

  @Get(":boardId")
  @ApiOperation({
    summary: "특정 공지사항 사이트(board)의 상위 board 조회 API",
    description: "특정 board의 상위(부모) board 정보를 조회한다.",
  })
  @ApiResponse({
    status: 200,
    description: "특정 공지사항 사이트 계층 구조",
    type: BoardTreeResponseDto,
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: "요청한 board Id가 존재하지 않을 경우",
    type: "string",
  })
  async findByBoard(
    @Param("boardId") boardId: number,
  ): Promise<BoardTreeResponseDto> {
    return this.boardTreeService.getBoardTree(boardId);
  }
}
