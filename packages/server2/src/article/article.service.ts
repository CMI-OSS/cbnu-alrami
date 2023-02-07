/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as dayjs from "dayjs";
import * as timezone from "dayjs/plugin/timezone";
import * as utc from "dayjs/plugin/utc";
import { BoardService } from "src/board/board.service";
import { ImageService } from "src/image/image.service";
import { User } from "src/user/entities/user.entity";
import { In, MoreThanOrEqual, Repository } from "typeorm";

import { ArticleViewService } from "../article-view/article.view.service";
import {
  DuplicatedArticleException,
  NotFoundArticleException,
} from "./article.exception";
import { CreateArticleDto } from "./dto/create-article.dto";
import {
  ResponseArticleDetailDto,
  ResponseArticleDto,
} from "./dto/response-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { Article } from "./entities/article.entity";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

const ARTICLE_PAGE_COUNT = 15;

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    private articleViewService: ArticleViewService,
    private imageService: ImageService,
    private boardService: BoardService,
  ) {}

  async create({ imageIds, boardId, ...createArticleDto }: CreateArticleDto) {
    const board = await this.boardService.findOne(boardId);

    if (createArticleDto.url) {
      const article = await this.findOneByUrl(createArticleDto.url);

      if (article) {
        throw new DuplicatedArticleException();
      }
    }

    const images = await this.imageService.findImages(imageIds ?? []);

    const article = await this.articleRepository.save({
      ...createArticleDto,
      board,
      images,
    });

    return article;
  }

  findAll() {
    return this.articleRepository.find();
  }

  async findBookmarkArticle(user: User, page: number, count: number) {
    const articles: Article[] = await this.articleRepository.find({
      where: {
        bookmarkUsers: {
          id: user.id,
        },
      },
      relations: {
        board: { parent: true },
        images: true,
      },
      order: {
        dateTime: "DESC",
      },
      take: count,
      skip: (page - 1) * count,
    });

    const result = Promise.all(
      articles.map<Promise<ResponseArticleDto>>(
        async ({ content, author, ...article }) => {
          return {
            ...article,
            bookmarkCount: await this.getBookmarkCount(article.id),
            viewCount: await this.getViewCount(article.id),
          } as ResponseArticleDto;
        },
      ),
    );

    return result;
  }

  async findSubscribeArticles(user: User, page: number, count: number) {
    const subscribeBoards = await this.boardService.getSubscribeBoards(user);

    const articles: Article[] = await this.articleRepository.find({
      where: {
        board: In(subscribeBoards.map((board) => board.id)),
      },
      relations: {
        board: { parent: true },
        images: true,
      },
      order: {
        dateTime: "DESC",
      },
      take: count,
      skip: (page - 1) * count,
    });

    const result = Promise.all(
      articles.map<Promise<ResponseArticleDto>>(
        async ({ content, author, ...article }) => {
          return {
            ...article,
            bookmarkCount: await this.getBookmarkCount(article.id),
            viewCount: await this.getViewCount(article.id),
          } as ResponseArticleDto;
        },
      ),
    );

    return result;
  }

  async findArticlePage(
    boardId: number,
    page: number,
    count: number,
  ): Promise<ResponseArticleDto[]> {
    const articles: Article[] = await this.articleRepository.find({
      where: {
        board: {
          id: boardId,
        },
      },
      relations: {
        board: { parent: true },
        images: true,
      },
      order: {
        dateTime: "DESC",
      },
      take: count,
      skip: (page - 1) * count,
    });

    const result = Promise.all(
      articles.map<Promise<ResponseArticleDto>>(
        async ({ content, author, ...article }) => {
          return {
            ...article,
            bookmarkCount: await this.getBookmarkCount(article.id),
            viewCount: await this.getViewCount(article.id),
          } as ResponseArticleDto;
        },
      ),
    );

    return result;
  }

  async findOne(id: number, user?: User): Promise<ResponseArticleDetailDto> {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: {
        board: { parent: true },
        images: true,
      },
    });

    if (!article) throw new NotFoundArticleException();

    // TODO: user_id와 article_id로 article_view 검색해서

    // TODO: 결과 없을 경우에만 조회수 +1

    const { ..._ariticle } = article;

    return {
      ..._ariticle,
      isView: await this.isView(article.id, user?.id),
      isBookmark: await this.isBookmark(article.id, user?.id),
      bookmarkCount: await this.getBookmarkCount(article.id),
      viewCount: await this.getViewCount(article.id),
    } as ResponseArticleDetailDto;
  }

  async isView(articleId: number, userId?: number): Promise<boolean> {
    if (!userId) return false;

    return !!(await this.articleRepository.countBy({
      id: articleId,
      viewUsers: {
        id: userId,
      },
    }));
  }

  async getViewCount(articleId: number): Promise<number> {
    const viewCount = await this.articleRepository.countBy({
      id: articleId,
      viewUsers: true,
    });

    return viewCount;
  }

  async isBookmark(articleId: number, userId?: number): Promise<boolean> {
    if (!userId) return false;

    return !!(await this.articleRepository.countBy({
      id: articleId,
      bookmarkUsers: {
        id: userId,
      },
    }));
  }

  async getBookmarkCount(articleId: number): Promise<number> {
    const viewCount = await this.articleRepository.countBy({
      id: articleId,
      bookmarkUsers: true,
    });

    return viewCount;
  }

  findOneByUrl(url: string) {
    return this.articleRepository.findOne({ where: { url } });
  }

  async update(
    id: number,
    { boardId, imageIds, ...updateArticleDto }: UpdateArticleDto,
  ) {
    const target = await this.findOne(id);

    const board = boardId && (await this.boardService.findOne(boardId));

    const article = {
      ...updateArticleDto,
      ...(board && { board }),
    };

    if (imageIds) {
      const images = await this.imageService.findImages(imageIds);
      target.images = images;
      target.save();
    }

    return this.articleRepository.update(target.id, article);
  }

  async remove(id: number) {
    const article = await this.findOne(id);

    return this.articleRepository.remove(article);
  }

  async bookmark(id: number, user: User) {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: { bookmarkUsers: true },
    });

    if (!article) throw new NotFoundArticleException();

    article.bookmarkUsers = article.bookmarkUsers
      ? [ user, ...article.bookmarkUsers ]
      : [ user ];

    return article.save();
  }

  async unbookmark(id: number, user: User) {
    const article = await this.articleRepository.findOne({
      where: {
        id,
        bookmarkUsers: {
          id: user.id,
        },
      },
      relations: { bookmarkUsers: true },
    });

    if (!article) throw new NotFoundArticleException();

    article.bookmarkUsers = article.bookmarkUsers.filter(
      (_user) => _user.id !== user.id,
    );

    return article.save();
  }

  async view(id: number, user?: User) {
    if (!user) return false;

    const article = await this.articleRepository.findOne({
      where: { id },
      relations: { viewUsers: true },
    });

    if (!article) throw new NotFoundArticleException();

    article.viewUsers = article.viewUsers
      ? [ user, ...article.viewUsers ]
      : [ user ];

    return article.save();
  }

  async findTopArticlesByHit() {
    // DESCRIBE: article 테이블에서 최근 2주 동안의 공지사항을 viewCount 내림차순으로 15개 조회
    const articles = await this.articleRepository.find({
      where: {
        dateTime: MoreThanOrEqual(this.getDateWeeksAgo(2)),
      },
      order: {
        viewCount: "DESC",
      },
      take: ARTICLE_PAGE_COUNT,
    });

    // const articles = await this.articleViewService.findPopularArticlesByView(
    //   this.getDateWeeksAgo(2),
    // );
    console.log(articles);

    // // DESCRIBE: 각 article에 대해 조회수, 스크랩 수 카운트
    // const result = await Promise.all(
    //   articles.map<Promise<ResponseArticleDto>>(
    //     async ({ content, author, ...article }) => {
    //       const board = await this.boardTreeService.getBoardTree(
    //         article.boardId,
    //       );
    //       return {
    //         ...article,
    //         ...board,
    //         bookmarkCount: await this.getBookmarkCount(article.id),
    //       } as ResponseArticleDto;
    //     },
    //   ),
    // );

    return articles;
  }

  getDateWeeksAgo = (weeks: number) => {
    // DESCRIBE: dayjs의 객체값 사용 -> d는 UTC, timezone은 KST로 있었으니까? -> 날짜 변환 함수를 쓰면 -> 내부적으로 KST로 바꿔주지 않을까!
    // FIXME: 이게..최선?
    return dayjs(
      dayjs().subtract(2, "week").tz().format("YYYY-MM-DD"),
    ).toDate();
  };
}
