import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AdminSession } from "src/commons/decorators/AdminSession.decorator";
import { AdminAuthGuard } from "src/commons/guards/admin-auth.guard";

import { BoardAuthorityService } from "./board-authority.service";
import { BoardAuthorityResponseDto } from "./dto/board-authority.response.dto";

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
    type: BoardAuthorityResponseDto,
    isArray: true,
  })
  @UseGuards(AdminAuthGuard)
  async findAll(@AdminSession() admin): Promise<BoardAuthorityResponseDto[]> {
    return this.boardAuthorityService.findAll(admin.id);
  }
}
