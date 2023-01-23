/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BoardService } from "src/board/board.service";
import { ImageService } from "src/image/image.service";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";

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

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
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

  async findBookmarkArticle(user: User) {
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
}
