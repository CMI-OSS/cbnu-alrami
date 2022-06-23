import { Cafeteria } from "src/commons/entities/cafeteria.entity";
import { errors } from "src/commons/error";
import { EntityRepository, Repository } from "typeorm";

const { CAFETERIA_NOT_FOUND } = errors;
@EntityRepository(Cafeteria)
export class CafeteriaRepository extends Repository<Cafeteria> {
  async findOneByPlaceName(name: string): Promise<Cafeteria> {
    const cafeteria = await this.findOne({
      where: {
        place: {
          name,
        },
      },
    });
    return cafeteria;
  }
}
