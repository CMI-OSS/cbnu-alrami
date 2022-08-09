import { addHours, subWeeks } from "date-fns";
import { Article } from "src/commons/entities/article.entity";
import { PageRequest } from "src/commons/page/page.request";
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

  async countByBoard(boardId: number): Promise<number> {
    return this.createQueryBuilder("article")
      .where("article.board_id = :boardId", { boardId })
      .getCount();
  }

  async countByBoardList(boardIdList: number[]): Promise<number> {
    return this.createQueryBuilder("article")
      .where("article.board_id In (:boardIdList)", { boardIdList })
      .getCount();
  }

  async existsByUrl(url: string): Promise<number> {
    return this.createQueryBuilder("article")
      .where("article.url = :url", { url })
      .getCount();
  }

  async findPopularArticlesByHit(): Promise<ArticleListDto[]> {
    const entityManager = getManager();
    const findPopularArticles = await entityManager.query(`
      SELECT id as id, title as title, board_id as boardId, date as date
      FROM (
               SELECT article.id, article.board_id, article.title, article.date,
                      COUNT(hit.id) AS count
               FROM hit
                        LEFT JOIN article
                                  ON hit.article_id = article.id
               WHERE article.date >= date_add(now(),interval -2 week)
               GROUP BY hit.article_id) AS A
      GROUP BY count desc, date desc
      LIMIT 15;
      `);
    return findPopularArticles;
  }

  async findPopularArticles(
    num: number,
    idList: number[],
  ): Promise<ArticleListDto[]> {
    const afterDate = subWeeks(addHours(new Date(), 9), 2);
    const articles = this.createQueryBuilder("article")
      .select([
        "article.id AS id",
        "article.title AS title",
        "article.date AS date",
        "article.board AS boardId",
      ])
      .andWhere(idList.length > 0 ? "article.id NOT IN (:...idList)" : "1=1", {
        idList,
      })
      .andWhere("article.date >= :afterDate", { afterDate })
      .orderBy("article.date", "DESC")
      .limit(num)
      .getRawMany();

    return articles;
  }

  async findRecentArticlesByBoard(
    boardIdList: number[],
    page: PageRequest,
  ): Promise<Article[]> {
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
