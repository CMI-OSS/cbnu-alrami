import { Cafeteria } from "src/commons/entities/cafeteria.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Cafeteria)
export class CafeteriaRepository extends Repository<Cafeteria> {}
