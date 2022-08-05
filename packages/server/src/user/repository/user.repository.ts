import { User } from "src/commons/entities/user.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findUserById(userIds: number[]) {
    return this.createQueryBuilder("user")
      .where("user.id IN (:userIds)", {
        userIds,
      })
      .getMany();
  }
}
