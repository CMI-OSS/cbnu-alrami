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

import { ArticleLike } from "./entities/article-like.entity";

@Injectable()
export class ArticleLikeService {
  constructor(
    @InjectRepository(ArticleLike)
    private articleLikeRepository: Repository<ArticleLike>,
    @Inject(forwardRef(() => ArticleService))
    private articleService: ArticleService,
  ) {}

  async isLike(articleId: number, userId: number) {
    return !!(await this.count(articleId, userId));
  }

  async like(articleId: number, user: User) {
    const article = await this.articleService.findById(articleId);
    const result = await this.save(article, user);
    await this.articleService.increaseLikeCount(articleId);
    return result;
  }

  async undoLike(articleId: number, user: User) {
    const articleLike = await this.findOne(articleId, user.id);
    const result = await this.remove(articleLike);
    await this.articleService.decreaseLikeCount(articleId);
    return result;
  }

  async save(article: Article, user: User) {
    if (await this.isLike(article.id, user.id))
      throw new NotFoundException("이미 좋아요 한 게시물");
    return this.articleLikeRepository.save({ article, user });
  }

  async remove(articleLike: ArticleLike | null) {
    if (!articleLike) throw new NotFoundException("좋아요 하지 않은 게시물");
    return this.articleLikeRepository.remove(articleLike);
  }

  async count(articleId: number, userId: number) {
    return this.articleLikeRepository.countBy({
      article: { id: articleId },
      user: { id: userId },
    });
  }

  async findOne(articleId: number, userId: number) {
    const articleLike = await this.articleLikeRepository.findOne({
      where: { article: { id: articleId }, user: { id: userId } },
    });
    return articleLike;
  }
}
