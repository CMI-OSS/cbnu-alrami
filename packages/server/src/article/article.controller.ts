import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Builder } from "builder-pattern";
import { BoardTreeService } from "src/boardTree/boardTree.service";
import { BoardTreeResponseDto } from "src/boardTree/dto/boardTree.response.dto";
import { Public } from "src/commons/decorators/public.decorator";

import { ArticleService } from "./article.service";
import { ArticleCreateDto } from "./dtos/article.create.dto";
import { ArticleDetailInfoDto } from "./dtos/article.detail.info.dto";
import { ArticleDto } from "./dtos/article.dto";
import { ArticleResponseDto } from "./dtos/article.response.dto";
import { ArticleUpdateDto } from "./dtos/article.update.dto";

@Public()
@Controller()
@ApiTags("[article] 공지사항 도메인 API")
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly boardTreeService: BoardTreeService,
  ) {}

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

  @Get("boards/articles/:articleId")
  async findById(
    @Param("articleId") articleId: number,
  ): Promise<ArticleResponseDto> {
    return this.articleService.findArticleRes(articleId);
  }

  @Post("/boards/:boardId/articles/:adminId")
  async create(
    @Param("boardId") boardId: number,
    @Param("adminId") adminId: number,
    @Body() articleCreateDto: ArticleCreateDto,
  ): Promise<number> {
    const article = await this.articleService.create(
      boardId,
      adminId,
      articleCreateDto,
    );
    return article.id;
  }

  @Put(":articleId")
  async update(
    @Param("articleId") articleId: number,
    @Body() articleUpdateDto: ArticleUpdateDto,
  ): Promise<ArticleDto> {
    const article = await this.articleService.update(
      articleId,
      articleUpdateDto,
    );
    const board: BoardTreeResponseDto =
      await this.boardTreeService.getBoardTree(article.board.id);

    return Builder(ArticleDto)
      .id(article.id)
      .board(board)
      .title(article.title)
      .content(article.content)
      .dates(article.date)
      .createdAt(article.createdAt)
      .updatedAt(article.updatedAt)
      .build();
  }

  @Delete(":articleId")
  async remove(@Param("articleId") articleId: number) {
    return this.articleService.remove(articleId);
  }
}
