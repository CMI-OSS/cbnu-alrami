import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ArticleView } from "./entities/article-view.entity";

@Injectable()
export class ArticleViewService {
  constructor(
    @InjectRepository(ArticleView)
    private articleViewRepository: Repository<ArticleView>,
  ) {}

  async findPopularArticlesByView(startDate: Date) {
    const articles = await this.articleViewRepository
      .createQueryBuilder("article_view")
      .leftJoinAndSelect("article_view.article", "article")
      .addSelect("COUNT(article_view.article)", "count")
      .where("article.date_time > :startDate", { startDate })
      .groupBy("article_view.article")
      .orderBy("count", "DESC")
      .limit(15)
      .getMany();
    return articles;
  }
}
