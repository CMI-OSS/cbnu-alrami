import { Column, Entity, ManyToOne } from "typeorm";

import { Admin } from "./admin.entity";
import { Board } from "./board.entity";
import { CommonEntity } from "./common.entity";

@Entity({ name: "article" })
export class Article extends CommonEntity {
  @ManyToOne(() => Board, (Board) => Board.id)
  board: number;

  @ManyToOne(() => Admin, (Admin) => Admin.id)
  author: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ type: "varchar", nullable: true })
  url: string;

  @Column()
  date: Date;
}
