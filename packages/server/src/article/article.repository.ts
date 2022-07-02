import { Article } from "src/commons/entities/article.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
  async findByBoard(boardId: number): Promise<Article[]> {
    return this.createQueryBuilder("article")
      .where("article.board_id = :boardId", { boardId })
      .getMany();
  }

  async existsByUrl(url: string): Promise<number> {
    return this.createQueryBuilder("article")
      .where("article.url != :url", { url })
      .getCount();
  }
}
