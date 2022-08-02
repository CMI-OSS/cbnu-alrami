import { Subscribe } from "src/commons/entities/subscribe.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Subscribe)
export class SubscribeRepository extends Repository<Subscribe> {
  async existsByUserAndBoard(userId: number, boardId: number): Promise<number> {
    return this.createQueryBuilder("subscribe")
      .where("subscribe.user_id = :userId", { userId })
      .andWhere("subscribe.board_id = :boardId", { boardId })
      .getCount();
  }

  async findBoardByUser(userId: number) {
    return this.createQueryBuilder("subscribe")
      .select([ "board_id AS boardId" ])
      .where("user_id = :userId", { userId })
      .getRawMany();
  }

  async findUserByBoard(boardId: number) {
    return this.createQueryBuilder("subscribe")
      .leftJoinAndSelect("subscribe.user", "user")
      .where("subscribe.board_id = :boardId", { boardId })
      .andWhere("subscribe.notice = :state", { state: true })
      .getMany();
  }
}
