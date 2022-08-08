import {
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserAuthGuard } from "src/commons/guards/user-auth.guard";

import { BookmarkService } from "./bookmark.service";

@Controller("bookmark")
@ApiTags("[subscribe] 게시글 북마크 API")
export class BookmarkControlelr {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Post("articles/:articleId")
  @ApiOperation({
    summary: "게시글 북마트 ON API",
    description: "특정 유저가 북마크한 게시글을 저장합니다.",
  })
  @ApiResponse({
    status: 200,
    description: "성공 여부",
  })
  @ApiHeader({
    name: "uuid",
    description: "user uuid",
  })
  @UseGuards(UserAuthGuard)
  async create(@Req() req, @Param("articleId") articleId: number) {
    const { user } = req;
    return this.bookmarkService.create(user, articleId);
  }

  @Delete("articles/:articleId")
  @ApiOperation({
    summary: "게시글 북마트 OFF API",
    description: "특정 유저가 선택한 북마크된 게시글을 삭제합니다.",
  })
  @ApiResponse({
    status: 200,
    description: "성공 여부",
  })
  @ApiHeader({
    name: "uuid",
    description: "user uuid",
  })
  @UseGuards(UserAuthGuard)
  async remove(@Req() req, @Param("articleId") articleId: number) {
    const { user } = req;
    return this.bookmarkService.remove(user, articleId);
  }
}
