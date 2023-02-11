import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ArticleService } from "src/article/article.service";
import { Article } from "src/article/entities/article.entity";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";

import { ArticleView } from "./entities/article-view.entity";

@Injectable()
export class ArticleViewService {
  constructor(
    @InjectRepository(ArticleView)
    private articleViewRepository: Repository<ArticleView>,
    @Inject(forwardRef(() => ArticleService))
    private articleService: ArticleService,
  ) {}

  async view(articleId: number, user: User) {
    if (!(await this.isView(articleId, user.id))) {
      const article = await this.articleService.findById(articleId);
      await this.save(article, user);
      await this.articleService.increaseViewCount(articleId);
    }
  }

  async isView(articleId: number, userId: number) {
    const viewCount = await this.articleViewRepository.countBy({
      article: { id: articleId },
      user: { id: userId },
    });
    return viewCount > 0;
  }

  async save(article: Article, user: User) {
    await this.articleViewRepository.save({ article, user });
  }
}
