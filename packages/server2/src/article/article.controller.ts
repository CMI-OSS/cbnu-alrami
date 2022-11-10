import { Body, Controller, Delete, Get, Param, Patch } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { MutationResponse } from "src/common/types/response";

import { CreateArticle } from "./article.decorator";
import { ArticleService } from "./article.service";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { Article } from "./entities/article.entity";

@Controller("article")
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @CreateArticle()
  create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
    return this.articleService.create(createArticleDto);
  }

  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.articleService.findOne(+id);
  }

  @Patch(":id")
  @ApiOkResponse({ type: MutationResponse })
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
