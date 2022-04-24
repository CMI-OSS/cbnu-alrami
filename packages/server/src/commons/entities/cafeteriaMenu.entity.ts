import { Column, Entity, ManyToOne } from "typeorm";

import { MealTime } from "../constants/enums";
import { Cafeteria } from "./cafeteria.entity";
import { CommonEntity } from "./common.entity";

@Entity()
export class CafeteriaMenu extends CommonEntity {
  @ManyToOne(() => Cafeteria)
  cafeteria: Cafeteria;

  @Column("varchar", { nullable: false })
  content: string;

  @Column("enum", { enum: MealTime, nullable: false })
  time: MealTime;

  @Column("date", { nullable: false })
  date: Date;
}
