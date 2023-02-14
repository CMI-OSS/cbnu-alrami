import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { Admin } from "./admin.entity";
import { Board } from "./board.entity";
import { UpdatableCommonEntity } from "./common.entity";

@Entity("article")
export class Article extends UpdatableCommonEntity {
  @ManyToOne(
    () => {
      return Board;
    },
    (Board) => {
      return Board.id;
    },
    { eager: true, onDelete: "CASCADE" },
  )
  @JoinColumn()
  board: Board;

  @ManyToOne(
    () => {
      return Admin;
    },
    (Admin) => {
      return Admin.id;
    },
  )
  @JoinColumn()
  author: Admin;

  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "longtext" })
  content: string;

  @Column({ type: "varchar", nullable: true })
  url: string;

  @Column({ type: "datetime" })
  date: Date;
}
