import { CafeteriaResponseDto } from "src/cafeteria/dto/cafeteria.response.dto";
import { CafeteriaMenu } from "src/commons/entities/cafeteriaMenu.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(CafeteriaMenu)
export class CafeteriaMenuRepository extends Repository<CafeteriaMenu> {
  async findByIdAndDate(
    id: number,
    date: string,
  ): Promise<CafeteriaResponseDto[]> {
    return this.createQueryBuilder("cafeteria_menu")
      .select("cafeteria_menu.id")
      .addSelect("cafeteria_menu.content")
      .addSelect("cafeteria_menu.time")
      .where("cafeteria_menu.cafeteria_id = :id", { id })
      .andWhere("cafeteria_menu.date = :date", { date })
      .getMany();
  }
}
