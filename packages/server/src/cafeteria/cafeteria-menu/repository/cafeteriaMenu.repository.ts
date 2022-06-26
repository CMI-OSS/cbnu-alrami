import { CafeteriaMenu } from "src/commons/entities/cafeteriaMenu.entity";
import { EntityRepository, Repository } from "typeorm";


@EntityRepository(CafeteriaMenu)
export class CafeteriaMenuRepository extends Repository<CafeteriaMenu>{

}