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

import { ArticleService } from "./article.service";
import {
  CreateArticle,
  DeleteArticle,
  GetArtice,
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
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.articleService.findOne(id);
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
}
