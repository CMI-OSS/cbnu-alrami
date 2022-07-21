import { Article } from "src/commons/entities/article.entity";
import { EntityRepository, getManager, Repository } from "typeorm";

import { ArticleListDto } from "./dtos/article.list.dto";

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

  async findPopularArticlesByHit(): Promise<ArticleListDto[]> {
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

  async findPopularArticles(
    num: number,
    idList: number[],
  ): Promise<ArticleListDto[]> {
    const articles = this.createQueryBuilder("article")
      .select([ "article.id", "article.title" ])
      .andWhere(idList.length > 0 ? "article.id NOT IN (:...idList)" : "1=1", {
        idList,
      })
      .orderBy("article.date", "DESC")
      .limit(num)
      .getMany();

    return articles;
  }

  async findRecentArticlesByBoard(boardIdList: number[]): Promise<Article[]> {
    return this.createQueryBuilder("article")
      .where("article.board_id IN (:boardIdList)", { boardIdList })
      .leftJoinAndSelect("article.board", "board")
      .orderBy("article.date", "DESC")
      .limit(5)
      .getMany();
  }
}
