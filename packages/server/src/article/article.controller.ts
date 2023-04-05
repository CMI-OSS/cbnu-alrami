import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AdminService } from "src/admin/admin.service";
import { AdminGuard } from "src/admin/gurads/admin.guard";
import { ArticleBookmarkService } from "src/article-bookmark/article-bookmark.service";
import { ArticleLikeService } from "src/article-like/article-like.service";
import { ArticleViewService } from "src/article-view/article-view.service";
import { PaginationDto } from "src/common/dto/pagination.dto";
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
  GetPopularArticle,
  GetSubscribeArticle,
  IsDuplicated,
  LikeArticle,
  UnBookmarkArticle,
  UndoLikeArticle,
  UpdateArticle,
} from "./article.swagger";
import { CreateArticleDto } from "./dto/create-article.dto";
import { DuplicatedResponseDto } from "./dto/duplicate.dto";
import { ArticleMutationResponseDto } from "./dto/response-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";

@ApiTags("[article] 게시물 API")
@Controller("article")
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly articleViewService: ArticleViewService,
    private readonly articleBookmarkService: ArticleBookmarkService,
    private readonly articleLikeService: ArticleLikeService,
    private readonly adminService: AdminService,
  ) {}

  @AdminGuard()
  @CreateArticle()
  @Post()
  async create(
    @Req() req,
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<ArticleMutationResponseDto> {
    await this.adminService.hasBoardAuthority(
      createArticleDto.boardId,
      req.admin.id,
    );

    const article = await this.articleService.create(
      createArticleDto,
      req.admin,
    );

    return {
      success: !!article,
      articleId: article.id,
    };
  }

  @IsDuplicated()
  @Get("duplicate")
  async isDuplicated(
    @Query("url") url: string,
  ): Promise<DuplicatedResponseDto> {
    const article = await this.articleService.findOneByUrl(url);

    return {
      isDuplicated: !!article,
    };
  }

  @GetBookmarkArtice()
  @UserHeader
  @Get("bookmark")
  findBookmarkArticle(
    @UserSession() user: User | undefined,
    @Query() query: PaginationDto,
  ) {
    return user
      ? this.articleService.findBookmarkArticlePage(
          user,
          query.page,
          query.count,
        )
      : [];
  }

  @GetSubscribeArticle()
  @UserHeader
  @Get("subscribe")
  findSubscribeArticle(
    @UserSession() user: User | undefined,
    @Query() query: PaginationDto,
  ) {
    return user
      ? this.articleService.findSubscribeArticlePage(
          user,
          query.page,
          query.count,
        )
      : [];
  }

  @GetPopularArticle()
  @Get("/popular")
  findPopularArticles(@Query() query: PaginationDto) {
    return this.articleService.findTopArticlesByHit(query.page, query.count);
  }

  @GetArtice()
  @UserHeader
  @Get(":id")
  async findOne(@Param("id") id: number, @UserSession() user?: User) {
    if (user) await this.articleViewService.view(id, user);
    return this.articleService.findOne(id, user);
  }

  @AdminGuard()
  @UpdateArticle()
  @Patch(":id")
  async update(
    @Req() req,
    @Param("id") id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<ArticleMutationResponseDto> {
    const { board } = await this.articleService.findOne(id);

    if (!board) {
      throw new NotFoundException();
    }

    await this.adminService.hasBoardAuthority(board.id, req.admin.id);

    const updateResult = await this.articleService.update(id, updateArticleDto);

    return {
      success: !!updateResult,
      articleId: id,
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
      success: !!(await this.articleBookmarkService.bookmark(id, user)),
    };
  }

  @UnBookmarkArticle()
  @Delete(":id/bookmark")
  async unbookmark(
    @Param("id") id: number,
    @UserSession() user: User,
  ): Promise<MutationResponse> {
    return {
      success: !!(await this.articleBookmarkService.unbookmark(id, user)),
    };
  }

  @LikeArticle()
  @Post(":id/like")
  async like(
    @Param("id") id: number,
    @UserSession() user: User,
  ): Promise<MutationResponse> {
    return {
      success: !!(await this.articleLikeService.like(id, user)),
    };
  }

  @UndoLikeArticle()
  @Delete(":id/like")
  async undoLike(
    @Param("id") id: number,
    @UserSession() user: User,
  ): Promise<MutationResponse> {
    return {
      success: !!(await this.articleLikeService.undoLike(id, user)),
    };
  }
}
