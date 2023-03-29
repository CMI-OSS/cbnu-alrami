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
import { SuperGuard } from "src/admin/gurads/super.guard";
import { ArticleService } from "src/article/article.service";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { MutationResponse } from "src/common/types/response";
import { User } from "src/user/entities/user.entity";
import { UserSession } from "src/user/user.decoratoer";
import { UserHeader } from "src/user/user.gurad";

import { BoardService } from "./board.service";
import {
  CreateBoard,
  DeleteBoard,
  GetArticlePage,
  GetBoard,
  GetBoards,
  GetSubscribeBoards,
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

  @SuperGuard()
  @CreateBoard()
  @Post()
  async create(
    @Body() createBoardDto: CreateBoardDto,
  ): Promise<MutationResponse> {
    return { success: !!(await this.boardService.create(createBoardDto)) };
  }

  @GetSubscribeBoards()
  @Get("subscribe")
  @UserHeader
  async findSubscribeBoards(@UserSession() user?: User) {
    return user ? this.boardService.findSubscribeBoards(user) : [];
  }

  @GetBoard()
  @Get(":id")
  @UserHeader
  async findOne(@Param("id") id: number, @UserSession() user?: User) {
    const subscribeBoards = user
      ? await this.boardService.getSubscribeBoards(user)
      : [];

    return this.boardService.getBoardWithSubscribe(
      await this.boardService.findOne(id),
      subscribeBoards,
      user,
    );
  }

  @GetBoards()
  @Get()
  @UserHeader
  async find(@UserSession() user?: User) {
    const subscribeBoards = user
      ? await this.boardService.getSubscribeBoards(user)
      : [];

    return this.boardService.getBoardsWithSubscribe(
      await this.boardService.findAll(),
      subscribeBoards,
      user,
    );
  }

  @GetArticlePage()
  @Get(":id/articles")
  findArticlePage(@Param("id") id: number, @Query() query: PaginationDto) {
    return this.articleService.findArticlePageByBoardId(
      id,
      query.page,
      query.count,
    );
  }

  @SuperGuard()
  @UpdateBoard()
  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() updateBoardDto: UpdateBoardDto,
  ): Promise<MutationResponse> {
    return {
      success: !!(await this.boardService.update(id, updateBoardDto)),
    };
  }

  @SuperGuard()
  @DeleteBoard()
  @Delete(":id")
  async remove(@Param("id") id: number): Promise<MutationResponse> {
    return { success: !!(await this.boardService.remove(id)) };
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
