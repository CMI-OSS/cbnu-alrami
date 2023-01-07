import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BoardService } from "src/board/board.service";
import { ImageService } from "src/image/image.service";
import { Repository } from "typeorm";

import {
  DuplicatedArticleException,
  NotFoundArticleException,
} from "./article.exception";
import { CreateArticleDto } from "./dto/create-article.dto";
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

  async create(createArticleDto: CreateArticleDto) {
    const board = await this.boardService.findOne(createArticleDto.boardId);

    if (createArticleDto.url) {
      const article = await this.findOneByUrl(createArticleDto.url);
      if (article) {
        throw new DuplicatedArticleException();
      }
    }

    const article = await this.articleRepository.save({
      ...createArticleDto,
      board,
    });

    await this.imageService.updateArticleImages(
      article,
      createArticleDto.imageIds ?? [],
    );

    return article;
  }

  findAll() {
    return this.articleRepository.find();
  }

  async findArticlePage(boardId: number, page: number, count: number) {
    const articles: Article[] = await this.articleRepository.find({
      where: {
        board: {
          id: boardId,
        },
      },
      relations: [ "board", "images" ],
      order: {
        dateTime: "DESC",
      },
      take: count,
      skip: (page - 1) * count,
    });
    return articles;
  }

  async findOne(id: number) {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: { board: { parent: true }, images: true },
    });

    if (!article) throw new NotFoundArticleException();

    return article;
  }

  findOneByUrl(url: string) {
    return this.articleRepository.findOne({ where: { url } });
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const target = await this.findOne(id);

    const board =
      updateArticleDto.boardId &&
      (await this.boardService.findOne(updateArticleDto.boardId));

    const article = this.articleRepository.create({
      ...updateArticleDto,
      ...(board && { board }),
    });

    return this.articleRepository.update(target.id, article);
  }

  async remove(id: number) {
    const article = await this.findOne(id);

    return this.articleRepository.remove(article);
  }
}
