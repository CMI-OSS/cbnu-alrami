import { Injectable } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { ArticleImageService } from "src/articleImage/articleImage.service";
import { BoardService } from "src/board/board.service";
import { BoardTreeService } from "src/boardTree/boardTree.service";
import { BoardTreeResponseDto } from "src/boardTree/dto/boardTree.response.dto";
import { BookmarkRepository } from "src/bookmark/bookmark.repository";
import { Admin } from "src/commons/entities/admin.entity";
import { Article } from "src/commons/entities/article.entity";
import { User } from "src/commons/entities/user.entity";
import { Errors } from "src/commons/exception/exception.global";
import { PageRequest } from "src/commons/page/page.request";
import { PageResponse } from "src/commons/page/page.response";
import { HitRepository } from "src/hit/hit.repository";
import { HitService } from "src/hit/hit.service";
import { ImageResponseDto } from "src/image/dto/image.response.dto";
import { ImageService } from "src/image/image.service";
import { SubscribeService } from "src/subscribe/subscribe.service";
import { In } from "typeorm";
import { Transactional } from "typeorm-transactional-cls-hooked";

import { FcmService } from "../fcm/fcm.service";
import { ArticleRepository } from "./article.repository";
import { ArticleCreateDto } from "./dtos/article.create.dto";
import { ArticleDetailInfoDto, ArticleResponseDto } from "./dtos/article.dto";
import { ArticleUpdateDto } from "./dtos/article.update.dto";

const { NO_DATA_IN_DB, ARTICLE_URL_EXISTS } = Errors;

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly bookmarkRepository: BookmarkRepository,
    private readonly hitService: HitService,
    private readonly hitRepository: HitRepository,
    private readonly boardService: BoardService,
    private readonly boardTreeService: BoardTreeService,
    private readonly subscribeService: SubscribeService,
    private readonly articleImageService: ArticleImageService,
    private readonly imageService: ImageService,
    private readonly fcmService: FcmService,
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

    await this.fcmService.sendNotices(boardId);

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

  async findByUrl(url: string): Promise<boolean> {
    const article = await this.articleRepository.findOne({
      where: {
        url,
      },
      relations: [ "board", "author" ],
    });
    return !!article;
  }

  async findByBoard(boardId: number): Promise<Article[]> {
    const articles: Article[] = await this.articleRepository.findByBoard(
      boardId,
    );
    if (!Array.isArray(articles) || articles.length === 0) throw NO_DATA_IN_DB;
    return articles;
  }

  async articlePaginator(
    boardId: number,
    page: PageRequest,
  ): Promise<Article[]> {
    const articles: Article[] = await this.articleRepository.find({
      where: {
        board: boardId,
      },
      relations: [ "board", "author" ],
      order: {
        date: "DESC",
      },
      take: page.getLimit(),
      skip: page.getOffset(),
    });
    return articles;
  }

  async articleByBoardPaginator(
    boardIdList: number[],
    page: PageRequest,
  ): Promise<Article[]> {
    const articles: Article[] = await this.articleRepository.find({
      where: {
        board: In(boardIdList),
      },
      relations: [ "board", "author" ],
      order: {
        date: "DESC",
      },
      take: page.getLimit(),
      skip: page.getOffset(),
    });
    if (!Array.isArray(articles) || articles.length === 0) throw NO_DATA_IN_DB;
    return articles;
  }

  async findTopArticlesByHit(): Promise<PageResponse<ArticleDetailInfoDto[]>> {
    let response = [];

    // DESCRIBE: hit 테이블에서 조회수 순으로 상위 15개 공지사항 조회
    const articlesByHit =
      await this.articleRepository.findPopularArticlesByHit();
    response.push(...articlesByHit);

    // DESCRIBE: 만약 조회수 있는 공지사항이 15개보다 적다면
    if (articlesByHit.length < 15) {
      // DESCRIBE: hit 테이블에서 가져온 article은 가져오지 않도록 리스트 생성
      const idList: number[] = [];
      articlesByHit.forEach((article) => {
        idList.push(article.id);
      });
      // DESCRIBE: 부족한 수만큼 article 테이블에서 날짜 순으로 공지사항 조회
      const num = 15 - articlesByHit.length;
      const articles = await this.articleRepository.findPopularArticles(
        num,
        idList,
      );
      response.push(...articles);
    }

    // DESCRIBE: hit 테이블 조회 결과와 article 테이블 조회 결과 합쳐서 리턴
    if (!Array.isArray(response) || response.length === 0) throw NO_DATA_IN_DB;

    // DESCRIBE: 각 article에 대해 조회수, 스크랩 수 카운트
    response = await Promise.all(
      response.map(async (article) => {
        const board: BoardTreeResponseDto =
          await this.boardTreeService.getBoardTree(article.boardId);
        const hitCnt = await this.hitRepository.countByArticle(article.id);
        const bookmarkCnt = await this.bookmarkRepository.countByArticle(
          article.id,
        );
        return Builder(ArticleDetailInfoDto)
          .id(article.id)
          .board(board)
          .title(article.title)
          .hits(hitCnt)
          .scraps(bookmarkCnt)
          .date(article.date)
          .build();
      }),
    );

    return new PageResponse(undefined, undefined, response);
  }

  @Transactional()
  async findArticleRes(id: number, user: User): Promise<ArticleResponseDto> {
    const article = await this.findById(id);
    const board: BoardTreeResponseDto =
      await this.boardTreeService.getBoardTree(article.board.id);

    // DESCRIBE: 유저가 존재한다면
    if (user !== undefined) {
      // DESCRIBE: 조회수 증가 (-> 중복 체크는 hit 모듈에서 처리)
      await this.hitService.create(user, article);
    }

    const hitCnt = await this.hitRepository.countByArticle(article.id);
    const bookmarkCnt = await this.bookmarkRepository.countByArticle(
      article.id,
    );

    // DESCRIBE: articleid와 uuid로 bookmark 여부 확인
    const isBookmark: boolean =
      user === undefined
        ? undefined
        : (await this.bookmarkRepository.existsByUserAndArticle(
            user.id,
            article.id,
          )) === 1;

    let images = [];
    const articleImages = await this.articleImageService.findImageByArticle(id);
    if (articleImages.length > 0 || typeof articleImages !== "undefined") {
      images = await Promise.all(
        articleImages.map(async (articleImage) => {
          const { image } = articleImage;
          return Builder(ImageResponseDto).id(image.id).url(image.url).build();
        }),
      );
    }

    return Builder(ArticleResponseDto)
      .id(article.id)
      .board(board)
      .title(article.title)
      .content(article.content)
      .url(article.url)
      .hits(hitCnt)
      .scraps(bookmarkCnt)
      .date(article.date)
      .updatedAt(article.updatedAt)
      .isBookmark(isBookmark)
      .images(images)
      .build();
  }

  async findArticleInfoListByBoard(
    boardId: number,
    pageRequest: PageRequest,
  ): Promise<PageResponse<ArticleDetailInfoDto[]>> {
    // DESCRIBE: 전체 article 수 조회
    const articlesCount = await this.articleRepository.countByBoard(boardId);
    // DESCRIBE: 게시판에 해당하는 공지사항 전체 조회
    const articles: Article[] = await this.articlePaginator(
      boardId,
      pageRequest,
    );
    const board: BoardTreeResponseDto =
      await this.boardTreeService.getBoardTree(boardId);
    let response = [];

    response = await Promise.all(
      articles.map(async (article) => {
        const hitCnt = await this.hitRepository.countByArticle(article.id);
        const bookmarkCnt = await this.bookmarkRepository.countByArticle(
          article.id,
        );
        return Builder(ArticleDetailInfoDto)
          .id(article.id)
          .board(board)
          .title(article.title)
          .hits(hitCnt)
          .scraps(bookmarkCnt)
          .date(article.date)
          .updatedAt(article.updatedAt)
          .build();
      }),
    );
    return new PageResponse(pageRequest, articlesCount, response);
  }

  @Transactional()
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

    // DESCRIBE: article 정보 업데이트
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

    // DESCRIBE: article image 수정 요청이 있는 경우만 진행
    const newImages: number[] = articleUpdateDto.images;
    await this.articleImageService.update(newImages, newArticle);
    return result;
  }

  @Transactional()
  async remove(id: number): Promise<boolean> {
    await this.findById(id);
    await this.articleRepository.delete({ id });
    return true;
  }

  async findBookmarkArticles(
    user: User,
  ): Promise<PageResponse<ArticleDetailInfoDto[]>> {
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
        const board: BoardTreeResponseDto =
          await this.boardTreeService.getBoardTree(article.board.id);
        const hitCnt = await this.hitRepository.count({ article });
        const bookmarkCnt = await this.bookmarkRepository.count({ article });
        response.push(
          Builder(ArticleDetailInfoDto)
            .id(article.id)
            .board(board)
            .title(article.title)
            .date(article.date)
            .hits(hitCnt)
            .scraps(bookmarkCnt)
            .build(),
        );
      }),
    );

    return new PageResponse(undefined, undefined, response);
  }

  async findSubscribeArticles(
    user: User,
    pageRequest: PageRequest,
  ): Promise<PageResponse<ArticleDetailInfoDto[]>> {
    const boardIdList = await this.subscribeService.findBoardByUser(user.id);
    const articleList = await this.articleByBoardPaginator(
      boardIdList,
      pageRequest,
    );
    const totalItemCount = await this.articleRepository.countByBoardList(
      boardIdList,
    );

    const response = await Promise.all(
      articleList.map(async (article) => {
        const board: BoardTreeResponseDto =
          await this.boardTreeService.getBoardTree(article.board.id);
        const hitCnt = await this.hitRepository.count({ article });
        const bookmarkCnt = await this.bookmarkRepository.count({ article });

        return Builder(ArticleDetailInfoDto)
          .id(article.id)
          .board(board)
          .title(article.title)
          .date(article.date)
          .hits(hitCnt)
          .scraps(bookmarkCnt)
          .build();
      }),
    );

    return new PageResponse(pageRequest, totalItemCount, response);
  }
}
