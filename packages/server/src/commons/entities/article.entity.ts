import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { Admin } from "./admin.entity";
import { Board } from "./board.entity";
import { CommonEntity } from "./common.entity";

@Entity({ name: "article" })
export class Article extends CommonEntity {
  @ManyToOne(() => Board, (Board) => Board.id)
  @JoinColumn({ name: "board_id" })
  boardId: Board;

  @ManyToOne(() => Admin, (Admin) => Admin.id)
  @JoinColumn({ name: "author_id" })
  authorId: Admin;

  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "text" })
  content: string;

  @Column({ type: "varchar", nullable: true })
  url: string;

  @Column({ type: "datetime" })
  date: Date;
}
