import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Builder } from "builder-pattern";
import { BoardTreeService } from "src/boardTree/boardTree.service";
import { BoardTreeResponseDto } from "src/boardTree/dto/boardTree.response.dto";
import { Public } from "src/commons/decorators/public.decorator";
import { AdminAuthGuard } from "src/commons/guards/admin-auth.guard";

import { ArticleService } from "./article.service";
import { ArticleCreateDto } from "./dtos/article.create.dto";
import { ArticleDetailInfoDto } from "./dtos/article.detail.info.dto";
import { ArticleDto } from "./dtos/article.dto";
import { ArticleListDto } from "./dtos/article.list.dto";
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
  @ApiResponse({
    status: 200,
    description: "요청 공지사항 사이트에 속한 모든 공지사항 리스트",
    type: ArticleDetailInfoDto,
    isArray: true,
  })
  async findByBoard(
    @Param("boardId") boardId: number,
  ): Promise<ArticleDetailInfoDto[]> {
    return this.articleService.findArticleInfoListByBoard(boardId);
  }

  @Get("boards/articles/:articleId")
  @ApiOperation({
    summary: "특정 공지사항 상세 정보 조회 API",
    description:
      "공지사항 id(pk)를 이용, 해당 공지사항의 상세 정보를 조회한다.",
  })
  @ApiResponse({
    status: 200,
    description: "요청 공지사항의 상세 정보",
    type: ArticleResponseDto,
  })
  async findById(
    @Param("articleId") articleId: number,
  ): Promise<ArticleResponseDto> {
    return this.articleService.findArticleRes(articleId);
  }

  @Post("/boards/:boardId/article")
  @ApiOperation({
    summary: "신규 공지사항 등록 API",
    description: "특정 공지사항 사이트에서 받아온 새로운 공지사항을 등록한다.",
  })
  @ApiResponse({
    status: 201,
    description: "생성된 article id (PK)",
  })
  @ApiHeader({
    name: "jwt",
    description: "admin jwt",
  })
  @UseGuards(AdminAuthGuard)
  async create(
    @Param("boardId") boardId: number,
    @Body() articleCreateDto: ArticleCreateDto,
    @Req() req,
  ): Promise<number> {
    const { admin } = req;
    const article = await this.articleService.create(
      boardId,
      admin.id,
      articleCreateDto,
    );
    return article.id;
  }

  @Put("/article/:articleId")
  @ApiOperation({
    summary: "특정 공지사항 정보 수정 API",
    description: "공지사항 id(pk)를 이용, 해당 공지사항의 정보를 수정한다.",
  })
  @ApiResponse({
    status: 200,
    description: "수정된 공지사항 정보",
    type: ArticleDto,
  })
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

  @Delete("/articles/:articleId")
  @ApiOperation({
    summary: "특정 공지사항 정보 삭제 API",
    description: "공지사항 id(pk)를 이용, 해당 공지사항의 정보를 삭제한다.",
  })
  @ApiResponse({
    status: 200,
    description: "true",
    type: "string",
  })
  async remove(@Param("articleId") articleId: number) {
    return this.articleService.remove(articleId);
  }

  @Get("/articles/popular")
  @ApiOperation({
    summary: "인기 공지사항 조회 API",
    description:
      "조회수와 공지사항 등록일을 이용, 제일 인기 많은 상위 5개의 공지사항들을 조회한다.",
  })
  @ApiResponse({
    status: 200,
    description: "공지사항 제목과 id",
    type: ArticleListDto,
    isArray: true,
  })
  async findPopularArticles(): Promise<ArticleListDto[]> {
    return this.articleService.findTopArticlesByHit();
  }
}
