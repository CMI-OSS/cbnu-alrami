import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

import { CommonEntity } from "./common.entity";
import { Place } from "./place.entity";

@Entity()
export class School extends CommonEntity {
  @OneToOne(() => Place, (Place) => Place.id)
  @JoinColumn()
  place: Place;

  @Column("varchar", { nullable: false })
  buildingNumber: string;

  @Column("varchar", { nullable: true })
  oldBuildingNumber: string;
}
