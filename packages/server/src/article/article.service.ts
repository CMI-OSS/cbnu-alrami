import { Injectable } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { BoardTreeService } from "src/boardTree/boardTree.service";
import { BoardTreeResponseDto } from "src/boardTree/dto/boardTree.response.dto";
import { BookmarkRepository } from "src/bookmark/bookmark.repository";
import { BookmarkService } from "src/bookmark/bookmark.service";
import { Article } from "src/commons/entities/article.entity";
import { Errors } from "src/commons/exception/exception.global";
import { HitRepository } from "src/hit/hit.repository";

import { ArticleRepository } from "./article.repository";
import { ArticleDetailInfoDto } from "./dtos/article.detail.info";

const { NO_DATA_IN_DB } = Errors;

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly boomarkRepository: BookmarkRepository,
    private readonly hitRepository: HitRepository,
    private readonly boardTreeService: BoardTreeService,
  ) {}

  async findByBoard(boardId: number): Promise<Article[]> {
    const articles: Article[] = await this.articleRepository.findByBoard(
      boardId,
    );
    if (!Array.isArray(articles) || articles.length === 0) throw NO_DATA_IN_DB;
    return articles;
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
}
