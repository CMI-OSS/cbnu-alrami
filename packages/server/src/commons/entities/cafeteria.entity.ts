import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";

import { CafeteriaMenu } from "./cafeteriaMenu.entity";
import { CommonEntity } from "./common.entity";
import { Place } from "./place.entity";

@Entity()
export class Cafeteria extends CommonEntity {
  @OneToOne(() => Place, {
    eager: true,
    onDelete: "CASCADE",
    nullable: false,
    onUpdate: "CASCADE",
    orphanedRowAction: "delete",
  })
  @JoinColumn()
  place: Place;

  @Column("varchar", { nullable: true, default: null })
  breakfastTimeInfo?: string;

  @Column("varchar", { nullable: true, default: null })
  lunchTimeInfo?: string;

  @Column("varchar", { nullable: true, default: null })
  dinnerTimeInfo?: string;

  @OneToMany(() => CafeteriaMenu, (cafeteriaMenu) => cafeteriaMenu.cafeteria)
  cafeteriaMenus: CafeteriaMenu[];
}
