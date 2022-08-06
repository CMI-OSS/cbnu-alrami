import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

import { CommonEntity } from "./common.entity";
import { Place } from "./place.entity";

export enum AREA {
  EAST = "E",
  NORTH = "N",
  SOUTH = "S",
}

@Entity("school")
export class School extends CommonEntity {
  @OneToOne(
    () => {
      return Place;
    },
    (Place) => {
      return Place.id;
    },
    { onDelete: "CASCADE" },
  )
  @JoinColumn()
  place: Place;

  @Column("varchar", { nullable: false })
  buildingNumber: string;

  @Column("varchar", { nullable: true })
  oldBuildingNumber: string;

  @Column("enum", { enum: AREA, nullable: true })
  area: AREA;
}
