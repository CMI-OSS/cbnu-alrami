import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { MealTime } from "../constants/enums";
import { Cafeteria } from "./cafeteria.entity";
import { UpdatableCommonEntity } from "./common.entity";

@Entity("cafeteria_menu")
export class CafeteriaMenu extends UpdatableCommonEntity {
  @ManyToOne(
    () => {
      return Cafeteria;
    },
    (cafeteria) => {
      return cafeteria.cafeteriaMenus;
    },
    {
      onDelete: "CASCADE",
    },
  )
  @JoinColumn({ name: "cafeteria_id" })
  cafeteria: Cafeteria;

  @Column("varchar", { nullable: false })
  content: string;

  @Column("enum", { enum: MealTime, nullable: false })
  time: MealTime;

  @Column("date", { nullable: false })
  date: Date;
}
