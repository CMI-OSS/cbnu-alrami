import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { MealTime } from "../constants/enums";
import { Cafeteria } from "./cafeteria.entity";
import { CommonEntity } from "./common.entity";

@Entity()
export class CafeteriaMenu extends CommonEntity({ updatable: true }) {
  @ManyToOne(() => Cafeteria, (cafeteria) => cafeteria.cafeteriaMenus)
  @JoinColumn({ name: "cafeteria_id" })
  cafeteria: Cafeteria;

  @Column("varchar", { nullable: false })
  content: string;

  @Column("enum", { enum: MealTime, nullable: false })
  time: MealTime;

  @Column("date", { nullable: false })
  date: Date;
}
