import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

import { CommonEntity } from "./common.entity";
import { Place } from "./place.entity";

@Entity()
export class Cafeteria extends CommonEntity {
  @OneToOne(() => Place)
  @JoinColumn()
  place: Place;

  @Column('varchar', { nullable: false })
  breakfastTimeInfo: string;

  @Column('varchar', { nullable: false })
  lunchTimeInfo: string;

  @Column('varchar', { nullable: false })
  dinnerTimeInfo: string;

}
