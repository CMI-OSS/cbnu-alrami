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

  @OneToOne(() => Board)
  @JoinColumn({ name: "parent_board_id" })
  parentBoard: Board;

}
