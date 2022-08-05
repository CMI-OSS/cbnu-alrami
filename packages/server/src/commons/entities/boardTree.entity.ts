import { Entity, JoinColumn, OneToOne } from "typeorm";

import { Board } from "./board.entity";
import { CommonEntity } from "./common.entity";

@Entity("board_tree")
export class BoardTree extends CommonEntity {
  @OneToOne(
    () => {
      return Board;
    },
    { onDelete: "CASCADE" },
  )
  @JoinColumn()
  board: Board;

  @OneToOne(
    () => {
      return Board;
    },
    { onDelete: "CASCADE" },
  )
  @JoinColumn()
  parentBoard: Board;
}
