import { Injectable, NotFoundException } from "@nestjs/common";
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
    private articleService: ArticleService,
  ) {}

  async bookmark(id: number, user: User) {
    const article = await this.articleService.findById(id);
    return this.save(article, user);
  }

  async unbookmark(id: number, user: User) {
    const articleBookmark = await this.findOne(id, user);
    if (!articleBookmark)
      throw new NotFoundException("북마크 하지 않은 게시물");

    return this.remove(articleBookmark);
  }

  async isBookmark(articleId: number, userId?: number): Promise<boolean> {
    if (!userId) return false;
    return !!(await this.articleBookmarkRepository.countBy({
      article: { id: articleId },
      user: { id: userId },
    }));
  }

  async findOne(id: number, user: User) {
    const articleBookmark = await this.articleBookmarkRepository.findOne({
      where: { article: { id }, user: { id: user.id } },
    });
    return articleBookmark;
  }

  async save(article: Article, user: User) {
    return this.articleBookmarkRepository.save({ article, user });
  }

  async remove(articleBookmark: ArticleBookmark) {
    return this.articleBookmarkRepository.remove(articleBookmark);
  }
}
