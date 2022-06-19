import { Controller, Get, Param } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Public } from "src/commons/decorators/public.decorator";
import { Article } from "src/commons/entities/article.entity";

import { ArticleService } from "./article.service";
import { ArticleDetailInfoDto } from "./dtos/article.detail.info.dto";
import { ArticleResponseDto } from "./dtos/article.response.dto";

@Public()
@Controller()
@ApiTags("[article] 공지사항 도메인 API")
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Public()
  @Get("boards/:boardId/articles")
  @ApiOperation({
    summary: "공지사항 사이트별 공지사항 목록 조회 API",
    description: "특정 공지사항 사이트에 속한 모든 공지사항들을 조회한다.",
  })
  async findByBoard(
    @Param("boardId") boardId: number,
  ): Promise<ArticleDetailInfoDto[]> {
    return this.articleService.findArticleInfoListByBoard(boardId);
  }

  @Public()
  @Get("boards/articles/:articleId")
  async findById(
    @Param("articleId") articleId: number,
  ): Promise<ArticleResponseDto> {
    return this.articleService.findArticleRes(articleId);
  }
}
