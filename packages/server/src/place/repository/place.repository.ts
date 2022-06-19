import { Place } from "src/commons/entities/place.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Place)
export class PlaceRepository extends Repository<Place> {}
