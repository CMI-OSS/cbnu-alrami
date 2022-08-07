import { Bookmark } from "src/commons/entities/bookmark.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Bookmark)
export class BookmarkRepository extends Repository<Bookmark> {
  async countByArticle(articleId: number): Promise<number> {
    return this.createQueryBuilder("bookmark")
      .where("bookmark.article_id = :articleId", { articleId })
      .getCount();
  }

  async existsByUserAndArticle(
    userId: number,
    articleId: number,
  ): Promise<number> {
    return this.createQueryBuilder("article")
      .where("article.user_id = :userId", { userId })
      .andWhere("article.article_id = :articleId", { articleId })
      .getCount();
  }
}
