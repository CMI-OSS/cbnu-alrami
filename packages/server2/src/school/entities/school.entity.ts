import { UpdatableCommonEntity } from "src/common/entity";
import { Place } from "src/place/entities/place.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class School extends UpdatableCommonEntity {
  @Column({ type: "varchar" })
  buildingNumber: string;

  @Column({ type: "varchar" })
  oldBuildingNumber: string;

  @Column({ type: "varchar" })
  area: string;

  @OneToOne(() => Place)
  @JoinColumn()
  place: Place;
}
