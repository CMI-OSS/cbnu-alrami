import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ArticleService } from "src/article/article.service";
import { Article } from "src/article/entities/article.entity";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";

import { ArticleBookmark } from "./entities/article-bookmark";

@Injectable()
export class ArticleBookmarkService {
  constructor(
    @InjectRepository(ArticleBookmark)
    private articleBookmarkRepository: Repository<ArticleBookmark>,
    @Inject(forwardRef(() => ArticleService))
    private articleService: ArticleService,
  ) {}

  async bookmark(id: number, user: User) {
    const article = await this.articleService.findById(id);
    await this.save(article, user);
  }

  async unbookmark(id: number, user: User) {
    const articleBookmark = await this.articleBookmarkRepository.findOne({
      where: { article: { id }, user: { id: user.id } },
    });

    if (!articleBookmark)
      throw new NotFoundException("북마크 하지 않은 게시물");

    await this.remove(articleBookmark);
  }

  async save(article: Article, user: User) {
    await this.articleBookmarkRepository.save({ article, user });
  }

  async remove(articleBookmark: ArticleBookmark) {
    await this.articleBookmarkRepository.remove(articleBookmark);
  }
}
