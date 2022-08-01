import { Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

import { Board } from "./board.entity";
import { CommonEntity } from "./common.entity";

@Entity("board_tree")
export class BoardTree extends CommonEntity {
  @OneToOne(() => Board, { onDelete: "CASCADE" })
  @JoinColumn()
  board: Board;

  @ManyToOne(() => Board, { onDelete: "CASCADE" })
  @JoinColumn()
  parentBoard: Board;
}
