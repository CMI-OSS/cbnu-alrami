import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
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
  UnBookmarkArticle,
  UpdateArticle,
} from "./article.swagger";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";

@ApiTags("[article] 게시물 API")
@Controller("article")
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @CreateArticle()
  @Post()
  async create(
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<MutationResponse> {
    return { success: await !!this.articleService.create(createArticleDto) };
  }

  @GetBookmarkArtice()
  @UserHeader
  @Get("bookmark")
  findBookmarkArticle(@UserSession() user?: User) {
    return user ? this.articleService.findBookmarkArticle(user) : [];
  }

  @GetArtice()
  @UserHeader
  @Get(":id")
  findOne(@Param("id") id: number, @UserSession() user: User) {
    this.articleService.view(id, user);

    return this.articleService.findOne(id, user);
  }

  @UpdateArticle()
  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<MutationResponse> {
    return {
      success: !!(await this.articleService.update(id, updateArticleDto)),
    };
  }

  @DeleteArticle()
  @Delete(":id")
  async remove(@Param("id") id: number): Promise<MutationResponse> {
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
