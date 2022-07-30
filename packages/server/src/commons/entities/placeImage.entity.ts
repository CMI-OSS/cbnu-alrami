import { Entity, JoinColumn, ManyToOne } from "typeorm";

import { CommonEntity } from "./common.entity";
import { Image } from "./image.entity";
import { Place } from "./place.entity";

@Entity("place_image")
export class PlaceImage extends CommonEntity {
  @ManyToOne(() => Place, (Place) => Place.id)
  @JoinColumn()
  place: Place;

  @ManyToOne(() => Image, (Image) => Image.id)
  @JoinColumn()
  image: Image;
}
