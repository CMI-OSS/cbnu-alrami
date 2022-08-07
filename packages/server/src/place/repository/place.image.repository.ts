import { Builder } from "builder-pattern";
import { Place } from "src/commons/entities/place.entity";
import { EntityRepository, Repository } from "typeorm";

import { Image } from "../../commons/entities/image.entity";
import { PlaceImage } from "../../commons/entities/placeImage.entity";

@EntityRepository(PlaceImage)
export class PlaceImageRepository extends Repository<PlaceImage> {
  async saveImages(image: Image, place: Place) {
    const placeImage = Builder(PlaceImage).place(place).image(image).build();
    await this.save(placeImage);
  }
}
