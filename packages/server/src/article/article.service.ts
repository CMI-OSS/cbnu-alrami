import { Injectable } from "@nestjs/common";
import { Builder } from "builder-pattern";
import * as moment from "moment-timezone";
import { AdminService } from "src/admin/admin.service";
import { ArticleImageService } from "src/articleImage/articleImage.service";
import { BoardService } from "src/board/board.service";
import { BoardTreeService } from "src/boardTree/boardTree.service";
import { BoardTreeResponseDto } from "src/boardTree/dto/boardTree.response.dto";
import { BookmarkRepository } from "src/bookmark/bookmark.repository";
import { Admin } from "src/commons/entities/admin.entity";
import { Article } from "src/commons/entities/article.entity";
import { User } from "src/commons/entities/user.entity";
import { Errors } from "src/commons/exception/exception.global";
import { HitRepository } from "src/hit/hit.repository";
import { ImageService } from "src/image/image.service";
import { SubscribeService } from "src/subscribe/subscribe.service";
import { Transactional } from "typeorm-transactional-cls-hooked";

import { ArticleRepository } from "./article.repository";
import { ArticleCreateDto } from "./dtos/article.create.dto";
import {
  ArticleDetailInfoDto,
  ArticleListInfoDto,
  ArticleResponseDto,
} from "./dtos/article.dto";
import { ArticleListDto } from "./dtos/article.list.dto";
import { ArticleUpdateDto } from "./dtos/article.update.dto";

const { NO_DATA_IN_DB, ARTICLE_URL_EXISTS } = Errors;

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly bookmarkRepository: BookmarkRepository,
    private readonly hitRepository: HitRepository,
    private readonly adminService: AdminService,
    private readonly boardService: BoardService,
    private readonly boardTreeService: BoardTreeService,
    private readonly subscribeService: SubscribeService,
    private readonly articleImageService: ArticleImageService,
    private readonly imageService: ImageService,
  ) {}

  @Transactional()
  async create(
    boardId: number,
    admin: Admin,
    articleCreateDto: ArticleCreateDto,
  ): Promise<Article> {
    if (
      !(await this.isEmpty(articleCreateDto.url)) &&
      (await this.articleRepository.existsByUrl(articleCreateDto.url)) > 0
    )
      throw ARTICLE_URL_EXISTS;

    const board = await this.boardService.findById(boardId);

    const article = Builder(Article)
      .author(admin)
      .board(board)
      .title(articleCreateDto.title)
      .content(articleCreateDto.content)
      .url(articleCreateDto.url)
      .date(articleCreateDto.date)
      .build();

    const result = await this.articleRepository.save(article);

    // DESCRIBE: image를 생성된 article과 연결
    await Promise.all(
      articleCreateDto.images.map(async (imageId) => {
        const image = await this.imageService.findById(imageId);
        // const image = await this.imageService.findByUrl(imageId);
        await this.articleImageService.create(image, article);
      }),
    );

    return result;
  }

  async isEmpty(str: string): Promise<boolean> {
    if (typeof str === "undefined" || str === null || str === "") return true;
    return false;
  }

  async findById(id: number): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: {
        id,
      },
      relations: [ "board", "author" ],
    });
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

  async findTopArticlesByHit(): Promise<ArticleListDto[]> {
    const response = [];

    // DESCRIBE: hit 테이블에서 조회수 순으로 상위 5개 공지사항 조회
    const articlesByHit =
      await this.articleRepository.findPopularArticlesByHit();
    response.push(...articlesByHit);

    // DESCRIBE: 만약 조회수 있는 공지사항이 5개보다 적다면
    if (articlesByHit.length < 5) {
      // DESCRIBE: hit 테이블에서 가져온 article은 가져오지 않도록 리스트 생성
      const idList: number[] = [];
      articlesByHit.forEach((article) => {
        idList.push(article.id);
      });
      // DESCRIBE: 부족한 수만큼 article 테이블에서 날짜 순으로 공지사항 조회
      const num = 5 - articlesByHit.length;
      const articles = await this.articleRepository.findPopularArticles(
        num,
        idList,
      );
      response.push(...articles);
    }

    // DESCRIBE: hit 테이블 조회 결과와 article 테이블 조회 결과 합쳐서 리턴
    if (!Array.isArray(response) || response.length === 0) throw NO_DATA_IN_DB;
    return response;
  }

  async findArticleRes(id: number): Promise<ArticleResponseDto> {
    const article = await this.findById(id);
    const board: BoardTreeResponseDto =
      await this.boardTreeService.getBoardTree(article.board.id);
    const hitCnt = await this.hitRepository.countByArticle(article.id);
    const bookmarkCnt = await this.bookmarkRepository.countByArticle(
      article.id,
    );

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
    const board: BoardTreeResponseDto =
      await this.boardTreeService.getBoardTree(boardId);
    const response: ArticleDetailInfoDto[] = [];

    await Promise.all(
      articles.map(async (article) => {
        const hitCnt = await this.hitRepository.countByArticle(article.id);
        const bookmarkCnt = await this.bookmarkRepository.countByArticle(
          article.id,
        );
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

  async update(
    admin: Admin,
    articleId: number,
    articleUpdateDto: ArticleUpdateDto,
  ): Promise<Article> {
    const beforeArticle = await this.findById(articleId);

    // DESCRIBE: 이전 값
    const { url } = beforeArticle;
    let { board } = beforeArticle;

    // DESCRIBE: 신규 url 값 -> 기존 Url과 다르고, 비어있지 않을 경우에만 중복 확인
    const newUrl: string = articleUpdateDto.url;
    if (
      url !== newUrl &&
      !(await this.isEmpty(newUrl)) &&
      (await this.articleRepository.existsByUrl(newUrl)) > 0
    )
      throw ARTICLE_URL_EXISTS;

    if (board.id !== articleUpdateDto.boardId) {
      board = await this.boardService.findById(articleUpdateDto.boardId);
    }

    const newArticle = Object.assign(
      beforeArticle,
      Builder(Article)
        .board(board)
        .author(admin)
        .title(articleUpdateDto.title)
        .content(articleUpdateDto.content)
        .url(articleUpdateDto.url)
        .date(articleUpdateDto.date)
        .build(),
    );
    const result = await this.articleRepository.save(newArticle);
    return result;
  }

  @Transactional()
  async remove(id: number): Promise<boolean> {
    await this.findById(id);
    await this.articleRepository.delete({ id });
    return true;
  }

  async findBookmarkArticles(user: User): Promise<ArticleListInfoDto[]> {
    const response = [];
    const bookmarkList = await this.bookmarkRepository.find({
      where: {
        user,
      },
      relations: [ "article" ],
    });

    await Promise.all(
      bookmarkList.map(async (bookmark) => {
        const { article } = bookmark;
        const hitCnt = await this.hitRepository.count({ article });
        const bookmarkCnt = await this.bookmarkRepository.count({ article });

        const formattedDate = moment(article.date).format("YY-DD-MM");
        response.push(
          Builder(ArticleListInfoDto)
            .id(article.id)
            .boardName(article.board.name)
            .title(article.title)
            .date(formattedDate)
            .hits(hitCnt)
            .scraps(bookmarkCnt)
            .build(),
        );
      }),
    );

    return response;
  }

  async findSubscribeArticles(user: User): Promise<ArticleListInfoDto[]> {
    const response = [];
    const boardIdList = await this.subscribeService.findBoardByUser(user.id);
    const articleList = await this.articleRepository.findRecentArticlesByBoard(
      boardIdList,
    );

    await Promise.all(
      articleList.map(async (article) => {
        const hitCnt = await this.hitRepository.count({ article });
        const bookmarkCnt = await this.bookmarkRepository.count({ article });

        const formattedDate = moment(article.date).format("YY-DD-MM");
        response.push(
          Builder(ArticleListInfoDto)
            .id(article.id)
            .boardName(article.board.name)
            .title(article.title)
            .date(formattedDate)
            .hits(hitCnt)
            .scraps(bookmarkCnt)
            .build(),
        );
      }),
    );

    return response;
  }
}
