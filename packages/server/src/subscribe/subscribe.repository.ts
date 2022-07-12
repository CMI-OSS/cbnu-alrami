import { Subscribe } from "src/commons/entities/subscribe.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Subscribe)
export class SubscribeRepository extends Repository<Subscribe> {}
