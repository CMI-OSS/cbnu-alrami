import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BoardService } from "src/board/board.service";
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

    return this.articleRepository.save({ ...createArticleDto, board });
  }

  findAll() {
    return this.articleRepository.find();
  }

  async findOne(id: number) {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: { board: { parent: true } },
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

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
