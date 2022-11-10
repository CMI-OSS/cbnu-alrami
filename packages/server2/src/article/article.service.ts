import {
  ConflictException,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BoardService } from "src/board/board.service";
import { Repository } from "typeorm";

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

    if (!board) {
      throw new NotFoundException("해당하는 보드가 없습니다.");
    }

    if (createArticleDto.url) {
      const article = await this.findOneByUrl(createArticleDto.url);
      if (article) {
        throw new ConflictException("이미 존재하는 게시물입니다.");
      }
    }

    return this.articleRepository.save({ ...createArticleDto, board });
  }

  findAll() {
    return this.articleRepository.find({ relations: [ "board" ] });
  }

  findOne(id: number) {
    return this.articleRepository.findOne({ where: { id } });
  }

  findOneByUrl(url: string) {
    return this.articleRepository.findOne({ where: { url } });
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
