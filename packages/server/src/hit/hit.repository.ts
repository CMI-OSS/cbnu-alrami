import { Hit } from "src/commons/entities/hit.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Hit)
export class HitRepository extends Repository<Hit> {
  async countByArticle(articleId: number): Promise<number> {
    return this.createQueryBuilder("hit")
      .where("hit.article_id = :articleId", { articleId })
      .getCount();
  }

  async existsByUserAndArticle(
    userId: number,
    articleId: number,
  ): Promise<number> {
    return this.createQueryBuilder("hit")
      .where("hit.user_id = :userId", { userId })
      .andWhere("hit.article_id = :articleId", { articleId })
      .getCount();
  }
}
