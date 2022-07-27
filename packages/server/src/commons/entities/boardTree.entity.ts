import { ApiProperty } from "@nestjs/swagger";
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Board } from "./board.entity";
import { CommonEntity } from "./common.entity";

@Entity("board_tree")
export class BoardTree extends CommonEntity {
  @OneToOne(() => {
    return Board;
  })
  @JoinColumn()
  board: Board;

  @OneToOne(() => {
    return Board;
  })
  @JoinColumn()
  parentBoard: Board;
}
