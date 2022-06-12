import { EntityRepository, Repository } from "typeorm";

import { Board } from "../commons/entities/board.entity";

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async existsById(id: number): Promise<number> {
    return this.createQueryBuilder("board")
      .where("board.id != :id", { id })
      .getCount();
  }

  async existsByIdAndName(id: number, name: string): Promise<number> {
    return this.createQueryBuilder("board")
      .where("board.id != :id", { id })
      .andWhere("board.name = :name", { name })
      .getCount();
  }

  async existsByIdAndUrl(id: number, url: string): Promise<number> {
    return this.createQueryBuilder("board")
      .where("board.id != :id", { id })
      .andWhere("board.url = :url", { url })
      .getCount();
  }
}
