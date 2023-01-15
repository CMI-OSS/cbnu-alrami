import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ArticleService } from "src/article/article.service";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { MutationResponse } from "src/common/types/response";
import { User } from "src/user/entities/user.entity";
import { UserSession } from "src/user/user.decoratoer";

import { BoardService } from "./board.service";
import {
  CreateBoard,
  DeleteBoard,
  GetArticlePage,
  GetBoard,
  GetBoards,
  NoticeBoard,
  SubscribeBoard,
  UnNoticeBoard,
  UnSubscribeBoard,
  UpdateBoard,
} from "./board.swagger";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";

@ApiTags("[board] 게시판 API")
@Controller("board")
export class BoardController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly boardService: BoardService,
  ) {}

  @CreateBoard()
  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }

  @GetBoard()
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.boardService.findOne(id);
  }

  @GetBoards()
  @Get()
  find() {
    return this.boardService.findAll();
  }

  @GetArticlePage()
  @Get(":id/articles")
  findArticlePage(@Param("id") id: number, @Query() query: PaginationDto) {
    return this.articleService.findArticlePage(id, query.page, query.count);
  }

  @UpdateBoard()
  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() updateBoardDto: UpdateBoardDto,
  ): Promise<MutationResponse> {
    await this.boardService.update(id, updateBoardDto);

    return {
      success: true,
    };
  }

  @DeleteBoard()
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.boardService.remove(id);
  }

  @SubscribeBoard()
  @Post(":id/subscribe")
  async subscribe(@Param("id") id: number, @UserSession() user: User) {
    return { success: await this.boardService.subscribe(id, user) };
  }

  @UnSubscribeBoard()
  @Delete(":id/subscribe")
  async unsubscribe(@Param("id") id: number, @UserSession() user: User) {
    return { success: await this.boardService.unsubscribe(id, user) };
  }

  @NoticeBoard()
  @Post(":id/notice")
  async notice(@Param("id") id: number, @UserSession() user: User) {
    return { success: await this.boardService.notice(id, user) };
  }

  @UnNoticeBoard()
  @Delete(":id/notice")
  async unnotice(@Param("id") id: number, @UserSession() user: User) {
    return { success: await this.boardService.unnotice(id, user) };
  }
}
