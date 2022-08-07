import { EntityRepository, Repository } from "typeorm";

import { Place } from "../../commons/entities/place.entity";

@EntityRepository(Place)
export class PlaceRepository extends Repository<Place> {
  async findAll() {
    return this.createQueryBuilder("place")
      .leftJoinAndSelect("place.school", "school")
      .select([
        "place.id",
        "place.name",
        "place.latitude",
        "place.longtitude",
        "place.address",
        "school.area",
      ])
      .leftJoinAndSelect("place.images", "images")
      .leftJoinAndSelect("images.image", "image")
      .getMany();
  }
}
