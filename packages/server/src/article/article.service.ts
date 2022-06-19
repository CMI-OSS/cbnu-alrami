import { Injectable } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { AdminService } from "src/admin/admin.service";
import { BoardRepository } from "src/board/board.repository";
import { BoardService } from "src/board/board.service";
import { BoardTreeService } from "src/boardTree/boardTree.service";
import { BoardTreeResponseDto } from "src/boardTree/dto/boardTree.response.dto";
import { BookmarkRepository } from "src/bookmark/bookmark.repository";
import { Article } from "src/commons/entities/article.entity";
import { Errors } from "src/commons/exception/exception.global";
import { HitRepository } from "src/hit/hit.repository";

import { ArticleRepository } from "./article.repository";
import { ArticleCreateDto } from "./dtos/article.create.dto";
import { ArticleDetailInfoDto } from "./dtos/article.detail.info.dto";
import { ArticleResponseDto } from "./dtos/article.response.dto";

const { NO_DATA_IN_DB } = Errors;

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly boomarkRepository: BookmarkRepository,
    private readonly hitRepository: HitRepository,
    private readonly adminService: AdminService,
    private readonly boardService: BoardService,
    private readonly boardTreeService: BoardTreeService,
  ) {}

  async create(boardId: number, adminId: number, articleCreateDto: ArticleCreateDto): Promise<Article> {
    const board = await this.boardService.findById(boardId);
    const admin = await this.adminService.findById(adminId);

    const article = Builder(Article)
        .board(board)
        .author(admin)
        .title(articleCreateDto.title)
        .content(articleCreateDto.content)
        .url(articleCreateDto.url)
        .date(articleCreateDto.date)
        .build();
    
    const result = await this.articleRepository.save(article);
    return result;
  }

  async findById(id: number): Promise<Article> {
    const article: Article = await this.articleRepository.findById(id);
    if (!article) throw NO_DATA_IN_DB;
    return article;
  }

  async findByBoard(boardId: number): Promise<Article[]> {
    const articles: Article[] = await this.articleRepository.findByBoard(
      boardId,
    );
    if (!Array.isArray(articles) || articles.length === 0) throw NO_DATA_IN_DB;
    return articles;
  }

  async findArticleRes(id: number): Promise<ArticleResponseDto> {
    const article: Article = await this.findById(id);
    const board: BoardTreeResponseDto = await this.boardTreeService.findByBoard(
        article.board.id,
      );
    const hitCnt = await this.hitRepository.countByArticle(article.id);
    const bookmarkCnt = await this.boomarkRepository.countByArticle(article.id);

    return Builder(ArticleResponseDto)
        .id(article.id)
        .board(board)
        .title(article.title)
        .content(article.content)
        .hits(hitCnt)
        .scraps(bookmarkCnt)
        .dates(article.date)
        .createdAt(article.createdAt)
        .updatedAt(article.updatedAt)
        .build();
  }

  async findArticleInfoListByBoard(
    boardId: number,
  ): Promise<ArticleDetailInfoDto[]> {
    const articles: Article[] = await this.findByBoard(boardId);
    const board: BoardTreeResponseDto = await this.boardTreeService.findByBoard(
      boardId,
    );
    const response: ArticleDetailInfoDto[] = [];

    await Promise.all(
      articles.map(async (article) => {
        const hitCnt = await this.hitRepository.countByArticle(article.id);
        const bookmarkCnt = await this.boomarkRepository.countByArticle(article.id);
        response.push(
          Builder(ArticleDetailInfoDto)
            .id(article.id)
            .board(board)
            .title(article.title)
            .hits(hitCnt)
            .scraps(bookmarkCnt)
            .dates(article.date)
            .build(),
        );
      }),
    );

    return response.length === 0 ? undefined : response;
  }

  async remove(id: number): Promise<boolean> {
    await this.findById(id);
    await this.articleRepository.delete({ id });
    return true;
  }
}
