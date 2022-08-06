import { Entity, JoinColumn, ManyToOne } from "typeorm";

import { CommonEntity } from "./common.entity";
import { Image } from "./image.entity";
import { Place } from "./place.entity";

@Entity("place_image")
export class PlaceImage extends CommonEntity {
  @ManyToOne(
    () => {
      return Place;
    },
    (Place) => {
      return Place.id;
    },
  )
  @JoinColumn()
  place: Place;

  @ManyToOne(
    () => {
      return Image;
    },
    (Image) => {
      return Image.id;
    },
    {
      eager: true,
      onDelete: "CASCADE",
    },
  )
  @JoinColumn()
  image: Image;
}
