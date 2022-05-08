import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";

import { Board } from "./board.entity";

@Entity({ name: "board_tree" })
export class BoardTree {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: "pk" })
  id!: number;

  @OneToOne(() => Board)
  @JoinColumn({ name: "board_id" })
  board: Board;

  //   @RelationId((boardTree: BoardTree) => boardTree.board)
  //   boardId: number;

  @OneToOne(() => Board)
  @JoinColumn({ name: "parent_board_id" })
  parentBoard: Board;

  //   @RelationId((boardTree: BoardTree) => boardTree.parentBoard)
  //   parentBoardId: number;

  //   @Column({ name: "board_id" })
  //   boardId: number;

  //   @OneToOne((type) => Board)
  //   @JoinColumn()
  //   board: Board;

  //   @Column({ name: "parent_board_id" })
  //   parentBoardId: number;

  //   @OneToOne((type) => Board)
  //   @JoinColumn()
  //   parentBoard: Board;
}
