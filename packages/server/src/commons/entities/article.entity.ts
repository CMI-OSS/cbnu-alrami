import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { Admin } from "./admin.entity";
import { Board } from "./board.entity";
import { CommonEntity } from "./common.entity";

@Entity({ name: "article" })
export class Article extends CommonEntity({ updatable: true }) {
  @ManyToOne(() => Board, (Board) => Board.id, { eager: true })
  @JoinColumn()
  board: Board;

  @ManyToOne(() => Admin, (Admin) => Admin.id)
  @JoinColumn()
  author: Admin;

  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "text" })
  content: string;

  @Column({ type: "varchar", nullable: true })
  url: string;

  @Column({ type: "datetime" })
  date: Date;
}
