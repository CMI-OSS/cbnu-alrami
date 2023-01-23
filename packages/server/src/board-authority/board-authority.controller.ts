import { Body, Controller, Delete, Get, Post, UseGuards } from "@nestjs/common";
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BoardTreeResponseDto } from "src/boardTree/dto/boardTree.response.dto";
import { AdminAuthGuard } from "src/commons/guards/admin-auth.guard";

import { AdminSession } from "../commons/decorators/admin-session.decorator";
import { BoardAuthorityService } from "./board-authority.service";
import {
  BoardAuthorityCreateDto,
  BoardAuthorityCreateResponseDto,
} from "./dtos/board-authority-create.dto";

@Controller("authority/boards")
@ApiTags("[board] 공지사항 사이트 도메인 API")
export class BoardAuthorityController {
  constructor(private readonly boardAuthorityService: BoardAuthorityService) {}

  @Get()
  @ApiOperation({
    summary: "권한이 있는 게시판 목록 조회 API",
    description: "권한이 있는 게시판을 조회",
  })
  @ApiHeader({
    name: "x-access-token",
    description: "admin jwt",
  })
  @ApiResponse({
    status: 200,
    description: "권한있는 게시판 목록",
    type: BoardTreeResponseDto,
    isArray: true,
  })
  @UseGuards(AdminAuthGuard)
  async findAll(@AdminSession() admin): Promise<BoardTreeResponseDto[]> {
    return this.boardAuthorityService.findAll(admin.id);
  }

  @Post()
  @ApiOperation({
    summary: "관리자에게 특정 보드 권한 부여",
    description: "관리자에게 특정 보드 권한 부여",
  })
  @ApiHeader({
    name: "x-access-token",
    description: "admin jwt",
  })
  @ApiResponse({
    status: 200,
    description: "성공여부",
    type: BoardAuthorityCreateResponseDto,
  })
  @UseGuards(AdminAuthGuard)
  async create(
    @Body() boardAuthority: BoardAuthorityCreateDto,
  ): Promise<BoardAuthorityCreateResponseDto> {
    try {
      await this.boardAuthorityService.create(
        boardAuthority.adminId,
        boardAuthority.boardId,
      );
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  }

  @Delete()
  @ApiOperation({
    summary: "관리자에게 특정 보드 권한 제거",
    description: "관리자에게 특정 보드 권한 제거",
  })
  @ApiHeader({
    name: "x-access-token",
    description: "admin jwt",
  })
  @ApiResponse({
    status: 200,
    description: "성공여부",
    type: BoardAuthorityCreateResponseDto,
  })
  @UseGuards(AdminAuthGuard)
  async remove(
    @Body() boardAuthority: BoardAuthorityCreateDto,
  ): Promise<BoardAuthorityCreateResponseDto> {
    try {
      await this.boardAuthorityService.remove(
        boardAuthority.adminId,
        boardAuthority.boardId,
      );
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  }
}
