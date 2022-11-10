import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from "@nestjs/swagger";
import { MutationResponse } from "src/common/types/response";

import { DuplicatedArticleException } from "./article.exception";
import { ArticleService } from "./article.service";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { Article } from "./entities/article.entity";

@Controller("article")
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @ApiCreatedResponse({
    description: "게시물이 정상적으로 작성된 경우",
    type: Article,
  })
  @ApiConflictResponse({ type: DuplicatedArticleException })
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
