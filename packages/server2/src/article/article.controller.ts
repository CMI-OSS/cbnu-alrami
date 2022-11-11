import { Body, Controller, Delete, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { MutationResponse } from "src/common/types/response";

import { CreateArticle, GetArtice, UpdateArticle } from "./article.decorator";
import { ArticleService } from "./article.service";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { Article } from "./entities/article.entity";

@ApiTags("[article] 게시물 API")
@Controller("article")
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @CreateArticle()
  create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
    return this.articleService.create(createArticleDto);
  }

  @GetArtice()
  findOne(@Param("id") id: number) {
    return this.articleService.findOne(id);
  }

  @UpdateArticle()
  async update(
    @Param("id") id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<MutationResponse> {
    await this.articleService.update(id, updateArticleDto);

    return {
      success: true,
    };
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.articleService.remove(+id);
  }
}
