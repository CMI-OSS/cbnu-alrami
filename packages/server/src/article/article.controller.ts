import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import {
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Builder } from "builder-pattern";
import { BoardTreeService } from "src/boardTree/boardTree.service";
import { BoardTreeResponseDto } from "src/boardTree/dto/boardTree.response.dto";
import { Admin } from "src/commons/entities/admin.entity";
import { User } from "src/commons/entities/user.entity";
import { AdminAuthGuard } from "src/commons/guards/admin-auth.guard";
import { PageRequest } from "src/commons/page/page.request";
import { PageResponse } from "src/commons/page/page.response";

import { AdminSession } from "../commons/decorators/admin-session.decorator";
import { UserSession } from "../commons/decorators/user-session.decorator";
import { ArticleService } from "./article.service";
import { ArticleCreateDto } from "./dtos/article.create.dto";
import {
  ArticleDetailInfoDto,
  ArticleDto,
  ArticleDuplicationResponseDto,
  ArticleResponseDto,
} from "./dtos/article.dto";
import { ArticleUpdateDto } from "./dtos/article.update.dto";

@Controller()
@ApiTags("[article] 공지사항 도메인 API")
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly boardTreeService: BoardTreeService,
  ) {}

  @Get("boards/:boardId/articles")
  @ApiQuery({
    name: "pageNo",
    required: false,
    description: "페이지 인덱스. 디폴트 1",
  })
  @ApiQuery({
    name: "pageSize",
    required: false,
    description: "페이지 사이즈. 디폴트 15",
  })
  @ApiOperation({
    summary: "공지사항 사이트별 공지사항 목록 조회 API",
    description:
      "특정 공지사항 사이트에 속한 모든 공지사항들을 조회한다. 페이징을 적용하며, 디폴트 페이지 인덱스는 1, 사이즈는 15",
  })
  @ApiResponse({
    status: 200,
    description: "요청 공지사항 사이트에 속한 모든 공지사항 리스트",
    type: ArticleDetailInfoDto,
    isArray: true,
  })
  async findByBoard(
    @Param("boardId") boardId: number,
    @Query("pageNo") pageNo: number,
    @Query("pageSize") pageSize: number,
  ): Promise<PageResponse<ArticleDetailInfoDto[]>> {
    const pageRequest: PageRequest = new PageRequest(pageNo, pageSize);
    return this.articleService.findArticleInfoListByBoard(boardId, pageRequest);
  }

  @Get("boards/articles/:articleId")
  @ApiOperation({
    summary: "특정 공지사항 상세 정보 조회 API",
    description:
      "공지사항 id(pk)를 이용, 해당 공지사항의 상세 정보를 조회한다.",
  })
  @ApiHeader({
    name: "uuid",
    description: "로그인 유저 uuid",
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: "요청 공지사항의 상세 정보",
    type: ArticleResponseDto,
  })
  async findById(
    @Req() req,
    @Param("articleId") articleId: number,
  ): Promise<ArticleResponseDto> {
    const { user } = req;
    return this.articleService.findArticleRes(articleId, user);
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
    name: "x-access-token",
    description: "admin jwt",
  })
  @UseGuards(AdminAuthGuard)
  async create(
    @Param("boardId") boardId: number,
    @Body() articleCreateDto: ArticleCreateDto,
    @AdminSession() admin: Admin,
  ): Promise<number> {
    const article = await this.articleService.create(
      boardId,
      admin,
      articleCreateDto,
    );
    return article.id;
  }

  @Put("/articles/:articleId")
  @ApiOperation({
    summary: "특정 공지사항 정보 수정 API",
    description: "공지사항 id(pk)를 이용, 해당 공지사항의 정보를 수정한다.",
  })
  @ApiResponse({
    status: 200,
    description: "수정된 공지사항 정보",
    type: ArticleDto,
  })
  @ApiHeader({
    name: "x-access-token",
    description: "admin jwt",
  })
  async update(
    @AdminSession() admin: Admin,
    @Param("articleId") articleId: number,
    @Body() articleUpdateDto: ArticleUpdateDto,
  ): Promise<ArticleDto> {
    const article = await this.articleService.update(
      admin,
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
      .date(article.date)
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
      "조회수와 공지사항 등록일을 이용, 최근 2주 동안 제일 인기가 많았던 상위 15개의 공지사항들을 조회한다.",
  })
  @ApiResponse({
    status: 200,
    description: "공지사항 제목과 id",
    type: ArticleDetailInfoDto,
    isArray: true,
  })
  async findPopularArticles(): Promise<PageResponse<ArticleDetailInfoDto[]>> {
    return this.articleService.findTopArticlesByHit();
  }

  @Get("/articles/bookmarks")
  @ApiOperation({
    summary: "북마크한 공지사항 조회 API",
    description: "유저가 북마크한 공지사항들을 조회한다.",
  })
  @ApiResponse({
    status: 200,
    description: "공지사항 정보",
    type: ArticleDetailInfoDto,
    isArray: true,
  })
  @ApiHeader({
    name: "uuid",
    description: "user uuid",
  })
  async findBookmarkArticles(
    @UserSession() user: User,
  ): Promise<PageResponse<ArticleDetailInfoDto[]>> {
    return this.articleService.findBookmarkArticles(user);
  }

  @Get("/articles/subscribe")
  @ApiOperation({
    summary: "최신 공지사항 조회 API",
    description:
      "유저가 구독 중인 공지사항 사이트에서 최신 공지사항을 조회한다. 페이징을 적용하며, 디폴트 페이지 인덱스는 1, 사이즈는 15",
  })
  @ApiQuery({
    name: "pageNo",
    required: false,
    description: "페이지 인덱스. 디폴트 1",
  })
  @ApiQuery({
    name: "pageSize",
    required: false,
    description: "페이지 사이즈. 디폴트 15",
  })
  @ApiResponse({
    status: 200,
    description: "공지사항 정보",
    type: ArticleDetailInfoDto,
    isArray: true,
  })
  @ApiHeader({
    name: "uuid",
    description: "user uuid",
  })
  async findSubscribeArticles(
    @UserSession() user: User,
    @Query("pageNo") pageNo: number,
    @Query("pageSize") pageSize: number,
  ) {
    console.log(pageNo);
    console.log(pageSize);
    const pageRequest: PageRequest = new PageRequest(pageNo, pageSize);
    console.log("확인", pageRequest);
    return this.articleService.findSubscribeArticles(user, pageRequest);
  }

  @Get("articles/duplication")
  @ApiOperation({
    summary: "공지사항 중복 확인",
    description: "URL을 사용하여 공지사항 존재 여부확인",
  })
  @ApiResponse({
    status: 200,
    description: "중복 true/false",
    type: ArticleDuplicationResponseDto,
  })
  async findByUrl(
    @Query("url") url: string,
  ): Promise<ArticleDuplicationResponseDto> {
    return {
      isDuplication: await this.articleService.findByUrl(url),
    };
  }
}
