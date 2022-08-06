import { addHours, subWeeks } from "date-fns";
import { Article } from "src/commons/entities/article.entity";
import { EntityRepository, getManager, Repository } from "typeorm";

import { ArticleListDto } from "./dtos/article.list.dto";

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
  async findByBoard(boardId: number): Promise<Article[]> {
    return this.createQueryBuilder("article")
      .where("article.board_id = :boardId", { boardId })
      .orderBy("article.date", "DESC")
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
               WHERE article.date >= date_add(now(),interval -2 week)
               GROUP BY hit.article_id) AS A
      GROUP BY count desc, date desc
      LIMIT 5;
      `);
    return findPopularArticles;
  }

  async findPopularArticles(
    num: number,
    idList: number[],
  ): Promise<ArticleListDto[]> {
    const afterDate = subWeeks(addHours(new Date(), 9), 2);
    const articles = this.createQueryBuilder("article")
      .select([ "article.id", "article.title" ])
      .andWhere(idList.length > 0 ? "article.id NOT IN (:...idList)" : "1=1", {
        idList,
      })
      .andWhere("article.date >= :afterDate", { afterDate })
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

  async articlePaginator(
    boardId: number,
    cursor: number,
    pageSize: number,
  ): Promise<Article[]> {
    return this.createQueryBuilder("article")
      .where("article.board_id = :boardId", { boardId })
      .andWhere("article.id < :cursor", { cursor })
      .orderBy("article.date", "DESC")
      .limit(pageSize)
      .getMany();
  }
}
