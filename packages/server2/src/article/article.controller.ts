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
  UnBookmarkArticle,
  UpdateArticle,
} from "./article.swagger";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { Article } from "./entities/article.entity";

@ApiTags("[article] 게시물 API")
@Controller("article")
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @CreateArticle()
  @Post()
  create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
    return this.articleService.create(createArticleDto);
  }

  @GetArtice()
  @UserHeader
  @Get(":id")
  findOne(@Param("id") id: number, @UserSession() user: User) {
    return this.articleService.findOne(id, user);
  }

  @UpdateArticle()
  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<MutationResponse> {
    await this.articleService.update(id, updateArticleDto);

    return {
      success: true,
    };
  }

  @DeleteArticle()
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.articleService.remove(+id);
  }

  @BookmarkArticle()
  @Post(":id/bookmark")
  bookmark(
    @Param("id") id: number,
    @UserSession() user: User,
  ): Promise<Article> {
    return this.articleService.bookmark(id, user);
  }

  @UnBookmarkArticle()
  @Delete(":id/bookmark")
  unbookmark(
    @Param("id") id: number,
    @UserSession() user: User,
  ): Promise<Article> {
    return this.articleService.unbookmark(id, user);
  }
}
