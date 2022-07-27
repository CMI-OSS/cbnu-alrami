import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";

import { CafeteriaMenu } from "./cafeteriaMenu.entity";
import { UpdatableCommonEntity } from "./common.entity";
import { Place } from "./place.entity";

@Entity("cafeteria")
export class Cafeteria extends UpdatableCommonEntity {
  @OneToOne(
    () => {
      return Place;
    },
    {
      eager: true,
      onDelete: "CASCADE",
      nullable: false,
      onUpdate: "CASCADE",
      orphanedRowAction: "delete",
    },
  )
  @JoinColumn()
  place: Place;

  @Column("varchar", { nullable: true, default: null })
  breakfastTimeInfo?: string;

  @Column("varchar", { nullable: true, default: null })
  lunchTimeInfo?: string;

  @Column("varchar", { nullable: true, default: null })
  dinnerTimeInfo?: string;

  @OneToMany(
    () => {
      return CafeteriaMenu;
    },
    (cafeteriaMenu) => {
      return cafeteriaMenu.cafeteria;
    },
  )
  cafeteriaMenus: CafeteriaMenu[];
}
