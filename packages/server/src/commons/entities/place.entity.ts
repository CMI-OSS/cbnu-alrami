import { Column, Entity, OneToMany, OneToOne } from "typeorm";

import { CommonEntity } from "./common.entity";
import { PlaceImage } from "./placeImage.entity";
import { School } from "./school.entity";

@Entity("place")
export class Place extends CommonEntity {
  @Column({ type: "varchar", default: "school" })
  type: string;

  @Column({ type: "varchar", unique: true, nullable: false })
  name: string;

  @Column({ type: "double", nullable: false })
  latitude: number;

  @Column({ type: "double", nullable: false })
  longtitude: number;

  @Column("varchar", { nullable: false })
  address: string;

  @Column("varchar", { nullable: false })
  contact: string;

  @Column("varchar", { nullable: true })
  description: string;

  @Column("varchar", { nullable: true })
  tags: string;

  @OneToOne(
    () => {
      return School;
    },
    (School) => {
      return School.place;
    },
    {
      eager: true,
    },
  )
  school: School;

  @OneToMany(
    () => {
      return PlaceImage;
    },
    (PlaceImage) => {
      return PlaceImage.place;
    },
    {
      eager: true,
    },
  )
  images: PlaceImage[];
}
