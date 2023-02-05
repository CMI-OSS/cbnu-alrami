import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AdminService } from "src/admin/admin.service";
import { AdminGuard } from "src/admin/gurads/admin.guard";
import { MutationResponse } from "src/common/types/response";
import { User } from "src/user/entities/user.entity";
import { UserSession } from "src/user/user.decoratoer";
import { UserHeader } from "src/user/user.gurad";

import { ArticleService } from "./article.service";
import {
  BookmarkArticle,
  CreateArticle,
  DeleteArticle,
  GetArtice,
  GetBookmarkArtice,
  GetSubscribeArticle,
  UnBookmarkArticle,
  UpdateArticle,
} from "./article.swagger";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";

@ApiTags("[article] 게시물 API")
@Controller("article")
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly adminService: AdminService,
  ) {}

  @AdminGuard()
  @CreateArticle()
  @Post()
  async create(
    @Req() req,
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<MutationResponse> {
    await this.adminService.hasBoardAuthority(
      createArticleDto.boardId,
      req.admin.id,
    );

    return { success: await !!this.articleService.create(createArticleDto) };
  }

  @GetBookmarkArtice()
  @UserHeader
  @Get("bookmark")
  findBookmarkArticle(@UserSession() user?: User) {
    return user ? this.articleService.findBookmarkArticle(user) : [];
  }

  @GetSubscribeArticle()
  @UserHeader
  @Get("subscribe")
  findSubscribeArticle(@UserSession() user?: User) {
    return user ? this.articleService.findSubscribeArticles(user) : [];
  }

  @GetArtice()
  @UserHeader
  @Get(":id")
  findOne(@Param("id") id: number, @UserSession() user: User) {
    this.articleService.view(id, user);

    return this.articleService.findOne(id, user);
  }

  @AdminGuard()
  @UpdateArticle()
  @Patch(":id")
  async update(
    @Req() req,
    @Param("id") id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<MutationResponse> {
    const { board } = await this.articleService.findOne(id);

    if (!board) {
      throw new NotFoundException();
    }

    await this.adminService.hasBoardAuthority(board.id, req.admin.id);

    return {
      success: !!(await this.articleService.update(id, updateArticleDto)),
    };
  }

  @AdminGuard()
  @DeleteArticle()
  @Delete(":id")
  async remove(@Req() req, @Param("id") id: number): Promise<MutationResponse> {
    const { board } = await this.articleService.findOne(id);

    if (!board) {
      throw new NotFoundException();
    }

    await this.adminService.hasBoardAuthority(board.id, req.admin.id);

    return {
      success: !!(await this.articleService.remove(id)),
    };
  }

  @BookmarkArticle()
  @Post(":id/bookmark")
  async bookmark(
    @Param("id") id: number,
    @UserSession() user: User,
  ): Promise<MutationResponse> {
    return {
      success: !!(await this.articleService.bookmark(id, user)),
    };
  }

  @UnBookmarkArticle()
  @Delete(":id/bookmark")
  async unbookmark(
    @Param("id") id: number,
    @UserSession() user: User,
  ): Promise<MutationResponse> {
    return {
      success: !!(await this.articleService.unbookmark(id, user)),
    };
  }
}
