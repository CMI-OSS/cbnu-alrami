import { EntityRepository, Repository } from "typeorm";
import { Board } from "../@entities/board.entity";

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async existsByIdAndName(id: number, name: string): Promise<Number> {
    return this.createQueryBuilder("board")
      .where("board.id != :id", { id })
      .andWhere("board.name = :name", { name })
      .getCount();
  }

  async existsByIdAndUrl(id: number, url: string): Promise<Number> {
    return this.createQueryBuilder("board")
      .where("board.id != :id", { id })
      .andWhere("board.url = :url", { url })
      .getCount();
  }
}
