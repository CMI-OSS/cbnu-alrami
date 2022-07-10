import { Article } from "src/commons/entities/article.entity";
import { EntityRepository, getManager, Repository } from "typeorm";

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
  async findByBoard(boardId: number): Promise<Article[]> {
    return this.createQueryBuilder("article")
      .where("article.board_id = :boardId", { boardId })
      .getMany();
  }

  async existsByUrl(url: string): Promise<number> {
    return this.createQueryBuilder("article")
      .where("article.url = :url", { url })
      .getCount();
  }

  async findPopularArticles() {
    const entityManager = getManager();
    const findPopularArticles = await entityManager.query(`
      SELECT id, title
      FROM (
               SELECT article.title,
                      article.date,
                      article.id,
                      COUNT(hit.id) AS count
               FROM hit
                        LEFT JOIN article
                                  ON hit.article_id = article.id
               GROUP BY hit.article_id) AS A
      GROUP BY count desc, date desc;
      `);
    return findPopularArticles;
  }
}
