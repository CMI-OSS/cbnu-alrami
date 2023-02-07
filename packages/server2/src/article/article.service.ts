/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BoardService } from "src/board/board.service";
import { ImageService } from "src/image/image.service";
import { User } from "src/user/entities/user.entity";
import { FindManyOptions, In, Repository } from "typeorm";

import {
  DuplicatedArticleException,
  NotFoundArticleException,
} from "./article.exception";
import { CreateArticleDto } from "./dto/create-article.dto";
import {
  ResponseArticleDetailDto,
  ResponseArticleDto,
  ResponseArticlePageDto,
} from "./dto/response-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { ArticleBookmark } from "./entities/article-bookmark";
import { Article } from "./entities/article.entity";

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(ArticleBookmark)
    private articleBookmarkRepository: Repository<ArticleBookmark>,
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

  async findBookmarkArticlePage(
    user: User,
    page: number,
    count: number,
  ): Promise<ResponseArticlePageDto> {
    const articlePage = await this.findArticlePage(page, count, {
      where: {
        bookmarkUsers: {
          user: {
            id: user.id,
          },
        },
      },
      relations: {
        bookmarkUsers: true,
        board: { parent: true },
        images: true,
      },
      order: {
        bookmarkUsers: {
          createdDateTime: "DESC",
        },
      },
    });

    return {
      ...articlePage,
      articles: articlePage.articles.map(
        ({ bookmarkUsers, ...article }) => article,
      ),
    };
  }

  async findSubscribeArticlePage(user: User, page: number, count: number) {
    const subscribeBoards = await this.boardService.getSubscribeBoards(user);

    return this.findArticlePage(page, count, {
      where: {
        board: {
          id: In(subscribeBoards.map((board) => board.id)),
        },
      },
    });
  }

  async findArticlePageByBoardId(
    boardId: number,
    page: number,
    count: number,
  ): Promise<ResponseArticlePageDto> {
    return this.findArticlePage(page, count, {
      where: {
        board: {
          id: boardId,
        },
      },
    });
  }

  async findArticlePage(
    page: number,
    count: number,
    option: FindManyOptions<Article>,
  ): Promise<ResponseArticlePageDto> {
    const articles: Article[] = await this.articleRepository.find({
      take: count,
      skip: (page - 1) * count,
      relations: {
        board: { parent: true },
        images: true,
      },
      order: {
        dateTime: "DESC",
      },
      // 'content'를 제외하기 위함
      select: [
        "id",
        "title",
        "url",
        "dateTime",
        "createdDateTime",
        "updatedDateTime",
      ],
      ...option,
    });

    const totalArticleCount: number = option.where
      ? await this.articleRepository.countBy(option.where)
      : 0;

    const totalPageCount = Math.ceil(totalArticleCount / count);

    const result = await Promise.all(
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

    return {
      pagination: {
        currentPage: page,
        totalPageCount,
        totalItemCount: totalArticleCount,
        isEnd: totalPageCount <= page,
      },
      articles: result,
    };
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

    return !!(await this.articleBookmarkRepository.countBy({
      article: { id: articleId },
      user: { id: userId },
    }));
  }

  async getBookmarkCount(articleId: number): Promise<number> {
    const bookmakrCount = await this.articleBookmarkRepository.countBy({
      article: {
        id: articleId,
      },
    });

    return bookmakrCount;
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
    });

    if (!article) throw new NotFoundArticleException();

    return this.articleBookmarkRepository.save({ article, user });
  }

  async unbookmark(id: number, user: User) {
    const articleBookmark = await this.articleBookmarkRepository.findOne({
      where: { article: { id }, user: { id: user.id } },
    });

    if (!articleBookmark)
      throw new NotFoundException("북마크 하지 않은 게시물");

    return this.articleBookmarkRepository.remove(articleBookmark);
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
}
