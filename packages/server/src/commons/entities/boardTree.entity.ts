import { Entity, JoinColumn, OneToOne } from "typeorm";

import { Board } from "./board.entity";
import { CommonEntity } from "./common.entity";

@Entity("board_tree")
export class BoardTree extends CommonEntity {
  @OneToOne(() => Board)
  @JoinColumn()
  board: Board;

  @OneToOne(() => Board)
  @JoinColumn()
  parentBoard: Board;
}
