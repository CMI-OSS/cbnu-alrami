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
    const result = await this.save(article, user);
    await this.articleService.increaseBookmarkCount(article.id);
    return result;
  }

  async unbookmark(id: number, user: User) {
    const articleBookmark = await this.findOne(id, user);
    const result = this.remove(articleBookmark);
    await this.articleService.decreaseBookmarkCount(id);
    return result;
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
    if (await this.isBookmark(article.id, user.id))
      throw new NotFoundException("이미 북마크 한 게시물");
    return this.articleBookmarkRepository.save({ article, user });
  }

  async remove(articleBookmark: ArticleBookmark | null) {
    if (!articleBookmark)
      throw new NotFoundException("북마크 하지 않은 게시물");
    return this.articleBookmarkRepository.remove(articleBookmark);
  }
}
