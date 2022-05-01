import { BoardTree } from "src/commons/entities/boardTree.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(BoardTree)
export class BoardTreeRepository extends Repository<BoardTree> {
  async findByBoard(boardId: number): Promise<BoardTree> {
    return this.createQueryBuilder("board_tree")
      .where("board_tree.board_id = :boardId", { boardId })
      .getOne();
  }
}
